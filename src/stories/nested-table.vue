<template>
   <Flexbox :style="{flexDirection: 'column'}">
      <Textbox :height="lineHeight" :width="200">
        {{this.table.name}}
      </Textbox>

      <Flexbox key="columns" :style="{flexDirection: 'column'}">
        <Flexbox v-for="column in this.table.columns" :key="column.name"  :style="{flexDirection: 'row', 'stroke-dasharray': '0,50,150'}">
          <Textbox :height="lineHeight" :width="30">{{column.isPK?"PK":" "}}</Textbox>
          <Textbox :height="lineHeight" :width="100">{{column.name}}</Textbox>
          <Textbox :height="lineHeight" :width="70">{{column.type}}</Textbox>
        </Flexbox>
      </Flexbox>
   </Flexbox>
</template>

<script>
import Flexbox from '../vue-svg-flexbox';
import Textbox from './textbox'

export default {
  name: 'Table',
  components: {
    Flexbox,
    Textbox,
  },
  data() {
    return {
      lineHeight: 30,
    }
  },
  props: {
    table: {
      type: Object,
      default: () => {
        return {
          name: "table",
          columns: [
            {name: 'col1', type: 'int', remarks: 'the column 1', isPK: true},
            {name: 'col2', type: 'string', remarks: 'the column 2'},
            {name: 'col3', type: 'int', remarks: 'the column 3'},
          ]
        }
      }
    }
  }
}
</script>
