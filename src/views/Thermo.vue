<template>
    <div >
      <p/>
      <div style='thermoTitleStyle'>
        <span>Thermostat {{name}}:</span>
        <span v-bind:class="{'blinkClass': isUpdating}"> {{temperature}} </span>
      </div>
      <ThermoSlider v-bind:key='this.$vnode.key' 
        v-bind:temperature='this.temperature'
        v-on:tempe_change='tempeChange'
        />
    </div>
</template>

<script>
// @ is an alias to /src
import ThermoSlider from './ThermoSlider.vue'
import thermoService from '@/services/thermoService.js'

export default {
  name: 'Thermo',
  props:['name', 'temperature'],
  data(){return {'isUpdating':false}},
  methods:{
    tempeChange:async function(temperature){
      this.isUpdating=true
      if (await thermoService(this.$store.state.accessToken, 
          this.$vnode.key, temperature) )
        this.$store.commit('setTemperature', 
          {seedId:this.$vnode.key, temperature})
      this.isUpdating=false
    },
  },
  components: {
    ThermoSlider
  }
}
</script>