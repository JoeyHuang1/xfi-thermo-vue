<template>
  <div>
    <h1>Account 
      <span v-bind:class='accountClass'>{{this.$store.state.userName}}</span>
    </h1>
    <Thermo  v-for='thermo in this.$store.state.thermos'
      v-bind:name="thermo.name"
      v-bind:temperature="thermo.temperature"
      v-bind:seedId="thermo.seedId"
      v-bind:key="thermo.seedId"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Thermo from './Thermo.vue'

export default {
  name: 'ThermoList',  
  data:()=>{return{accountClass:''}},
  methods:{
  },
  mounted: async function(){
    if (this.$store.state.accessToken) {
      this.accountClass='blinkClass'
      try{    
        await this.$store.dispatch('getSeeds')
      }
      catch(e){
        
      }
      this.accountClass=''
    } else {
      this.$router.push('/')
    }
  },
  components: {
    Thermo
  }
}
</script>