<template>
  <div style='display:inline-block;width:400px'>
    <Slider v-model="value" :show-tooltip="true"
        v-on:change='change' :max=90 :min=50
    ></Slider>
  </div>
</template>

<script>
// @ is an alias to /src
import { Slider } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default {
  name: 'ThermoSlider',
  props:['temperature'],
  data: function(){return{'value':this.temperature}},
  methods:{
      change:function(){
          this.$emit('tempe_change', this.value)
      },
  },
  components: {
      Slider
  }
}
</script>