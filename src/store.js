import Vue from 'vue'
import Vuex from 'vuex'
import thermoListService from '@/services/thermoListService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken:null,
    userName:'',
    thermos:[]
  },
  mutations: {
    didLogin(state, payload){
      state.accessToken=payload.accessToken
      state.userName=payload.userName
    },
    gotSeeds(state, seeds){
      state.thermos = seeds
    },
    setTemperature(state, payload){
      let newVal={...state.thermos[payload.seedId], temperature:payload.temperature}
      Vue.set(state.thermos, payload.seedId, newVal)
    },
  },
  actions: {
    async getSeeds(context){
      let thermoList = await thermoListService(context.state.accessToken) 
      context.commit('gotSeeds', thermoList)
    },
  }
})
