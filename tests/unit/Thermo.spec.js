import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Thermo from '@/views/Thermo.vue'
import { Slider } from 'element-ui';
import store from '@/store.js'
const localVue = createLocalVue()

localVue.use(Vuex)

describe("thermo", () => {
  let extRel
  let fetchPromise = new Promise((resolve)=>{extRel = resolve});
  it("slider change", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
        var p = new Promise((resolve) => {
            resolve({
                ok: true, 
                status:200,
            })
            Vue.nextTick(()=>{
                setTimeout(()=>{extRel()}, 1000)
            })        
        });

        return p;
    })
    
    const wrapper = shallowMount(Thermo, {store, localVue, 
        propsData: {'temperature':56, 'seedId':'qqq'},
    })
    store.commit = jest.fn();

    wrapper.find(Slider).vm.$emit('change', 60)
    await fetchPromise // don't catch(), otherwise mask out jest failure
    expect(store.commit.mock.calls[0][0]).toEqual('setTemperature');
    expect(store.commit.mock.calls[0][1])
        .toEqual({ seedId: 'qqq', temperature: 60 });


    fetchPromise = new Promise((resolve)=>{extRel = resolve});
    wrapper.find(Slider).vm.$emit('change', 78)
    await fetchPromise
    expect(store.commit.mock.calls[1][0]).toEqual('setTemperature');
    expect(store.commit.mock.calls[1][1]).toEqual(
        { seedId: 'qqq', temperature: 78 });

    global.fetch.mockRestore()   
  
  });

  it("must have seedId prop", async () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    shallowMount(Thermo, {store, localVue})
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: Missing required prop');

    shallowMount(Thermo, {store, localVue,
        propsData: {'temperature':56, 'seedId':'qqq'}})
    
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();

  });
});