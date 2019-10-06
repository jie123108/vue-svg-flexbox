Basic usage

```vue
<template>
  <Flexbox :x="x">
    <rect :fill="bgcolor" :width="width" :height="height" stroke="blue" :style="{}" />
    <text :x="width/2" :y="height/2" :style="textStyle">
      <slot></slot>
    </text>
  </Flexbox>
</template>

<script>
import Flexbox from '../vue-svg-flexbox';

export default {
  name: 'Textbox',
  components: {
    Flexbox,
  },
  props: {
    bgcolor: {type: String, default: '#c0ffc0'},
    x: {type: Number, default: 0},
    width: {type: Number, default: 100},
    height: {type: Number, default: 100},
    textStyle: {
      type: Object,
      default () {
        return {
          "dominant-baseline": "central",
          "font-family": "arial",
          "text-anchor": "middle",
        }
      },
    }
  }
}
</script>
```