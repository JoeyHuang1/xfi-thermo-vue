<template>
    <div >
      <p/>
      <div style='thermoTitleStyle'>
        <span>Thermostat {{name}}:</span>
        <span v-bind:class="{'blinkClass': isUpdating}"> {{temperature}} </span>
      </div>
      <div style='display:inline-block;width:400px'>
        <Slider v-model="sliderVal" :show-tooltip="true"
          v-on:change='tempeChange' :max=90 :min=50
        ></Slider>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import thermoService from '@/services/thermoService.js'
import { Slider } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default {
  name: 'Thermo',
  props:['name', 'temperature'],
  data(){return {'isUpdating':false, sliderVal:this.temperature}},
  methods:{
    tempeChange:async function(){
      this.isUpdating=true
      try{
        await thermoService(this.$store.state.accessToken, 
          this.$vnode.key, this.sliderVal)
        this.$store.commit('setTemperature', 
          {seedId:this.$vnode.key, 'temperature':this.sliderVal})
      }catch(e){
        this.sliderVal = this.temperature
      }
      this.isUpdating=false
    },
  },
  components: {
    Slider
  }
}
</script>