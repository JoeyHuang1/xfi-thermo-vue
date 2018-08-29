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
import { Slider } from 'element-ui'
import thermoService from '@/services/thermoService.js'

export default {
  name: 'Thermo',
  props:{'name':String, 'temperature':Number, 
    'seedId':{type:String, required:true}},
  data(){return {'isUpdating':false, sliderVal:this.temperature}},
  methods:{
    tempeChange:async function(val){
      this.isUpdating=true
      try{
        await thermoService(this.$store.state.accessToken, 
          this.seedId, val)
        this.$store.commit('setTemperature', 
          {seedId:this.seedId, 'temperature':val})
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