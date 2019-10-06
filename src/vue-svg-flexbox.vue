
<script>
import computeLayout from 'css-layout';
const _ = require('lodash')

export default {
  name: 'Flexbox',
  props: {
    className: {
      type: String,
      default: null,
    },
    onLayout: {
      type: Function,
      default: () => {},
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      childRefs: [],
      shouldUpdateAgain: false,
      layout: {
        children: [],
      },
    };
  },
  computed: {

  },
  mounted() {
    // Force update for initial layout.
    this.$forceUpdate();
  },
  updated() {
    this.$nextTick(() => {
    /*
    SVG elements must be added to the DOM before they
    can be measured. This means that each update
    requires two render passes: one to add elements
    to the DOM, another to measure them and do layout.
    SVG elements cannot be measured before they've
    been added to the DOM. To this end, we use a simple
    on/off switch to determine whether or not we should
    set layout on state again.
    */
      this.shouldUpdateAgain = !this.shouldUpdateAgain;
      if (this.shouldUpdateAgain) {
        // Measure child elements.
        const childrenBBox = this.getChildrenBBox(this.childRefs);

        // Merge measurements with passed styles.
        const flattenedChildren = this.getFlattenedChildren(this.$slots.default);
        const childrenAsMergedStyles = this.getChildrenAsMergedStyles(
          flattenedChildren,
          childrenBBox,
        );

        const style = {};
        if(this.$vnode && this.$vnode.data && this.$vnode.data.style) {
          Object.assign(style, this.$vnode.data.style)
        }
        // Compute layout.
        const layout = this.getComputedLayout(childrenAsMergedStyles, style);

        // Pass layout to any concerned parent.
        this.onLayout(layout);

        // Trigger an update with the new layout.
        this.layout = layout;
      }
    },
    );
  },
  methods: {
    createChildElement(vnode, attrs, createElement) {
      // const clonedChildren = vnode.children && vnode.children.map(node => this.createChildElement(node, {}, createElement));
      if(!vnode) {
        return vnode;
      }

      const data = _.cloneDeep(vnode.data || {});
      if(!data.attrs) {
        data.attrs = {}
      }
      if(!data.props) {
        data.props = {}
      }

      data.attrs = {...attrs, ...data.attrs};
      data.props = {...attrs, ...data.props};

      // console.log('-----------------------------------------------')
      // console.log('>>>> node:', vnode)
      // console.log('>>> data::', data);

      const cloned = createElement(vnode.tag, data, vnode.children);
      cloned.text = vnode.text;
      cloned.componentOptions = vnode.componentOptions;
      cloned.elm = vnode.elm;
      cloned.context = vnode.context;
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;
      cloned.isComment = vnode.isComment;
      cloned.fnContext = vnode.fnContext;
      cloned.fnOptions = vnode.fnOptions;
      cloned.fnScopeId = vnode.fnScopeId;
      cloned.asyncMeta = vnode.asyncMeta;
      cloned.isCloned = true;


      return cloned;
    },

    /*
      Returns children flattened into a single array.

      If this component is asked to lay out a combination
      of individually declared components/elements, and
      an array of the same returned from a map operation,
      React will throw an error. This can be prevented
      by flattening children out into a single array.
    */
    getFlattenedChildren(children) {
      return Array.isArray(children)
        ? children
          // Filter out null indexes:
          .filter(child => child)
          // Filter out string literals:
          .filter(child => typeof child !== 'string')
          // Ensure that all children are arrays:
          .map(child => (Array.isArray(child) ? child : [child]))
          // Flatten into a single array:
          .reduce((previous, current) => previous.concat(current), [])
        : [children];
    },

    /*
      Returns child props merged with child measurements.

      If the child has explicit styles for width and height,
      those will be used. If those styles are not present,
      we will use measured widths and heights.
    */
    getChildrenAsMergedStyles(children, childrenBBox) {
      return childrenBBox.map((childBBox, index) => {
        const child = children[index] || {};
        const style = child && child.data && child.data.style ? child.data.style : {};
        return {
          style: {
            ...style,
            height: childBBox.height || style.height,
            width: childBBox.width || style.width,
          },
        };
      });
    },

    /*
      Returns width and height measurements for children.

      You can pass explicit width and height styles for child elements,
      but usually it's most convenient to let this component measure
      them for you and use those numbers for layout.
    */
    getChildrenBBox(childRefs) {
      return childRefs && childRefs.length
        ? childRefs.map((childRef) => {
          if (childRef.getBBox) {
            return childRef.getBBox();
          } else if (childRef.elm && childRef.elm.getBBox) {
            return childRef.elm.getBBox();
          }
          return {};
        },
        )
        : [];
    },

    /*
      Returns values computed by css-layout.
    */
    getComputedLayout(childrenWithMergedStyles, style) {
      const layout = {
        children: Array.from(childrenWithMergedStyles || []),
        style: { ...style },
      };
      computeLayout(layout);
      return layout;
    },

    /*
      Digs into a layout object and returns the array of children.
    */
    getLayoutChildren(layout) {
      if (layout && layout.children && layout.children.length) {
        return layout.children;
      }
      return [];
    },

    /*
      Returns an object containing layout properties for a child element.
      Different types of SVG elements require different types of layout.
    */
    getLayoutAttributesForChild(child, layoutChild) {
      if (layoutChild && layoutChild.layout) {
        const { left, top } = layoutChild.layout;
        switch (child.tag) {
          case 'circle': {
          /*
          Offset is used to position the circle from
          its top left corner, not its center.
          */
            const offset = child.data.attrs.r || 0;
            return {
              cx: left + offset,
              cy: top + offset,
            };
          }
          case 'ellipse': {
          /*
          Offset is used to position the ellipse from
          its top left corner, not its center.
          */
            const offsetX = child.data.attrs.rx || 0;
            const offsetY = child.data.attrs.ry || 0;
            return {
              cx: left + offsetX,
              cy: top + offsetY,
            };
          }
          case 'rect':
          case 'line':
          case 'marker':
          case 'text':
          case 'tspan':
          case 'tref':
          case 'textpath':
          case 'switch':
          case 'image':
          case 'a':
          case 'defs':
          case 'symbol':
            return {
              x: left,
              y: top,
            };
          case 'g':
          case 'path':
          case 'polygon':
          case 'polyline':
          default:
            return {
              transform: `translate(${left} ${top})`,
            };
        }
      }
      return {};
    },
  },

  render(h) {
    // console.log('>>>> flexbox render ......., props:', JSON.stringify(this.$props));

    const childRefs = [];

    const flattenedChildren = this.getFlattenedChildren(this.$slots.default);
    // console.log('>>> flattenedChildren::', flattenedChildren.length);

    const layoutChildren = this.getLayoutChildren(this.layout);
    return (
      <g className={this.className} transform={`translate(${this.x} ${this.y})`}>
        {flattenedChildren.map((child, index) => {
          // console.log('>>>layoutChildren[', index, ']: ', layoutChildren[index])
          // console.log(' layout child :::', child);
          const layoutAttrs = this.getLayoutAttributesForChild(child, layoutChildren[index]);

          // console.log('>>>> layoutAttrs:', JSON.stringify(layoutAttrs))
          const attrs = {
            // ...child.$props,
            ...layoutAttrs,
          };
          // console.log('>>>>>--- child attrs:', JSON.stringify(attrs));

          // console.log('>>>> child', child.tag , ', data:::', JSON.stringify(child.data));
          const childComponent = this.createChildElement(child, attrs, h);
          childRefs.push(childComponent);
          if (index === flattenedChildren.length - 1) {
            this.childRefs = childRefs;
          }
          return childComponent;
        })}
      </g>
    );
  },
};
</script>
