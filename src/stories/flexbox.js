
import {storiesOf} from '@storybook/vue';
import Flexbox from '../vue-svg-flexbox'
import NestedTable from './nested-table'
import Vue from 'vue'


const fill = '#cd6a51';
const margin = 20;
const rectSize = 140;
const textStyle = {
  dominantBaseline: 'central',
  fill: '#fff',
  fontFamily: 'arial',
  textAnchor: 'middle',
};

Vue.component('flexbox-story', {
  name: "flexbox-story",
  components: {Flexbox},
  props: {
    flexProps: {
      type: Object,
      default() {
        return {}
      }
    },
    width: {
      type: Number,
      default() {
        return 800;
      }
    },
    height: {
      type: Number,
      default() {
        return 600;
      }
    },
    padding: {
      type: Number,
      default() {
        return 20;
      },
    }
  },
  data: function () {
    return {
      count: 0,
      style: {
        height: this.height,
        padding: this.padding,
        width: this.width,
        ...this.flexProps,
      }
    }
  },
  template: `
  <svg :height="height" :width="width">
    <rect lassName='BackgroundFill' fill='#ccc' height='100%' width='100%' />
    <Flexbox :style="style">
      <slot></slot>
    </Flexbox>
  </svg>
`,
})

const getStoryInternal1 = (flexProps, style, widths) => {
  return {
    name: 'flexbox',
    render(h) {
      const children = widths.map((width, index) => (
        <g key={index} style={style}>
          <rect fill={fill} width={width} height={rectSize}/>
          <text style={textStyle} x={width / 2} y={rectSize / 2}>
            {`Item ${index + 1}`}
          </text>
        </g>
      ));
      return (
        <flexbox-story flexProps={flexProps}>
          {children}
        </flexbox-story>
      );
    }
  };
}

const getStoryInternal2 = (flexProps, style, heights) => {
  return {
    name: 'flexbox',
    render(h) {
      const children = heights.map((height, index) => (
        <g key={index} style={style}>
          <rect fill={fill} width={rectSize} height={height} />
          <text style={textStyle} x={rectSize / 2} y={height / 2}>
            {`Item ${index + 1}`}
          </text>
        </g>
      ));
      return (
        <flexbox-story flexProps={flexProps}>
          {children}
        </flexbox-story>
      );
    }
  };
}

const getStory = (flexProps, style) => {
  return getStoryInternal1(flexProps, style, [rectSize, rectSize, rectSize * 2]);
}

const getJustifyContentStory = (flexProps, style) => {
  return getStoryInternal1(flexProps, style, [rectSize, rectSize / 2, rectSize * 2]);
}

const getAlignItemsStory = (flexProps, style) => {
  return getStoryInternal2(flexProps, style, [rectSize, rectSize * 2, rectSize / 2, rectSize]);
}

const getSquareStory = (flexProps, style) => {
  return {
    name: 'flexbox',
    render(h) {
      const children = Array.from({length: 6}, (datum, index) => (
        <g key={index} style={style}>
          <rect fill={fill} height={rectSize} width={rectSize} />
          <text style={textStyle} x={rectSize / 2} y={rectSize / 2}>
            {`Item ${index + 1}`}
          </text>
        </g>
      ));
      return (
        <flexbox-story flexProps={flexProps}>
          {children}
        </flexbox-story>
      );
    }
  };
}

storiesOf('Flexbox', module)
  .add('flex-direction: row', () => {
    const flexProps = {
      flexDirection: 'row',
    };
    const style = {
      marginRight: margin,
    }
    return getStory(flexProps, style);
  })

  .add('flex-direction: row-reverse', () => {
    const flexProps = {
      flexDirection: 'row-reverse',
    };
    const style = {
      marginLeft: margin,
    }

    return getStory(flexProps, style);
  })

  .add('flex-direction: column', () => {
    const flexProps = {
      flexDirection: 'column',
    };
    const style = {
      marginBottom: margin,
    }

    return getStory(flexProps, style);
  })

  .add('flex-direction: column-reverse', () => {
    const flexProps = {
      flexDirection: 'column-reverse',
    };
    const style = {
      marginTop: margin,
    }

    return getStory(flexProps, style);
  })

  .add('flex-wrap: no-wrap', () => {
    const flexProps = {
      flexDirection: 'row',
      flexWrap: 'no-wrap',
    };
    const style = {
      marginRight: margin,
    }

    return getSquareStory(flexProps, style)
  })

  .add('flex-wrap: wrap', () => {
    const flexProps = {
      flexDirection: 'row',
      flexWrap: 'wrap',
    };
    const style = {
      marginBottom: margin,
      marginRight: margin,
    }

    return getSquareStory(flexProps, style)
  })

  .add('justify-content: flex-start', () => {
    const flexProps = {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    };
    const style = {
      marginRight: margin,
    };
    return getJustifyContentStory(flexProps, style);
  })

  .add('justify-content: flex-end', () => {
    const flexProps = {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    };
    const style = {
      marginLeft: margin,
    };
    return getJustifyContentStory(flexProps, style);
  })

  .add('justify-content: center', () => {
    const flexProps = {
      flexDirection: 'row',
      justifyContent: 'center',
    };
    const style = {
      marginRight: margin,
    };
    return getJustifyContentStory(flexProps, style);
  })

  .add('justify-content: space-between', () => {
    const flexProps = {
      flexDirection: 'row',
      justifyContent: 'space-between',
    };

    const style = { };
    return getJustifyContentStory(flexProps, style);
  })

  .add('justify-content: space-around', () => {
    const flexProps = {
      flexDirection: 'row',
      justifyContent: 'space-around',
    };

    const style = { };
    return getJustifyContentStory(flexProps, style);
  })

  .add('align-items: flex-start', () => {
    const flexProps = {
      alignItems: 'flex-start',
      flexDirection: 'row',
    };
    const style = {
      marginRight: margin,
    };
    return getAlignItemsStory(flexProps, style);
  })

  .add('align-items: flex-end', () => {
    const flexProps = {
      alignItems: 'flex-end',
      flexDirection: 'row',
    };
    const style = {
      marginRight: margin,
    };
    return getAlignItemsStory(flexProps, style);
  })

  .add('align-items: center', () => {
    const flexProps = {
      alignItems: 'center',
      flexDirection: 'row',
    };
    const style = {
      marginRight: margin,
    };
    return getAlignItemsStory(flexProps, style);
  })

  .add('align-content: flex-start', () => {
    const flexProps = {
      alignContent: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
    };
    const style={
      marginRight: margin,
      marginTop: margin,
    };

    return getSquareStory(flexProps, style);
  })

  .add('align-content: flex-end', () => {
    const flexProps = {
      alignContent: 'flex-end',
      flexDirection: 'row',
      flexWrap: 'wrap',
    };
    const style={
      marginRight: margin,
      marginTop: margin,
    };

    return getSquareStory(flexProps, style);
  })

  .add('align-content: center', () => {
    const flexProps = {
      alignContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    };
    const style={
      marginRight: margin,
      marginTop: margin,
    };

    return getSquareStory(flexProps, style);
  })

  .add('align-content: stretch', () => {
    const flexProps = {
      alignContent: 'stretch',
      flexDirection: 'row',
      flexWrap: 'wrap',
    };
    const style={
      marginRight: margin,
      marginTop: margin,
    };

    return getSquareStory(flexProps, style);
  })

  .add('flex-direction: row-reverse, with a single child', () => {
    // To test that there are no bugs with a single child.
    const flexProps = {
      flexDirection: 'row-reverse',
    };
    return {
      name: 'flexbox',
      render(h) {
        return (
          <flexbox-story flexProps={flexProps}>
            <rect fill={fill} height={rectSize} width={rectSize} />
          </flexbox-story>
        );
      }
    };
  })

  .add('common element types', () => {
    const flexProps = {
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    };

    const style = {
      marginBottom: 20,
      marginRight: 20,
    }
      return {
        name: 'flexbox',
        render(h) {
          return (
            <flexbox-story flexProps={flexProps}>
              <circle fill={'black'} r={50} style={style} />
              <ellipse fill={'white'} rx={50} ry={30}  style={style}/>
              <path d={'M 0 0 L 100 0 L 50 100 z'} fill={'orange'} style={style}/>
              <polygon fill={'cyan'} points={'0,100 50,0 100,100'} style={style}/>
              <text
                fill={'green'}
                fontFamily={'Arial,Helvetica'}
                style={{
                  dominantBaseline: 'text-before-edge',
                  marginBottom: 20,
                  marginRight: 20,
                }}>
                {'wow such flexbox'}
              </text>
              <polyline
                fill={'none'}
                points={'0,100 50,0 100,100'}
                stroke={'yellow'}
                strokeWidth={3}
                style={style}
              />
              <rect fill={'red'} height={100} width={100} style={style}/>
              <image
                height={100}
                href={'https://media.giphy.com/media/RKCAeG662WQSc/giphy.gif'}
                width={80}
                style={style}
              />
            </flexbox-story>
          );
        }
      };
  })

  .add('nested', () => {
    return {
      name: 'flexbox',
      components: {
        NestedTable
      },
      render(h) {
        const flexProps = {
          flexDirection: 'row',
        };
        return (
          <flexbox-story flexProps={flexProps}>
            <nested-table />
          </flexbox-story>
        );
      }
    };
  })

