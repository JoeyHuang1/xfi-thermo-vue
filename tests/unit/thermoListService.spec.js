import sinon from 'sinon'
import gfetch from "isomorphic-fetch"
import { expect } from 'chai'

import thermoListService, {filterThermo} from '../../src/services/thermoListService.js'
import ComcastConst from '../../src/ComcastConst.js'


describe("ThermoList", () => {

  it("should filter thermo", () => {
    let in1={fake:'123 '}
    let in2={seedId:'134123'}
    in2[ComcastConst.parent_type]=ComcastConst.parent_val
    
    expect(Object.keys(filterThermo(null)).length).to.equal(0)
    
    expect(Object.keys(filterThermo({})).length).to.equal(0)
    expect(Object.keys(filterThermo([{}])).length).to.equal(0)
    expect(Object.keys(filterThermo([in1])).length).to.equal(0)
    
    in2[ComcastConst.attribSetAttr]=[{}]
    expect(Object.keys(filterThermo([in2])).length).to.equal(0)

    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0]['abc']=ComcastConst.heat_mode
    expect(Object.keys(filterThermo([in2])).length).to.equal(0)

    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]=ComcastConst.cool_mode
    expect(Object.keys(filterThermo([in2])).length).to.equal(1)

    let in3={seedId:'asda'}
    in3[ComcastConst.parent_type]=ComcastConst.parent_val
    in3[ComcastConst.attribSetAttr]=[{}]
    in3[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]=ComcastConst.heat_mode
    expect(Object.keys(filterThermo([in2, in3])).length).to.equal(2)

    in3[ComcastConst.parent_type]='w1qUpEDz_100000'
    expect(Object.keys(filterThermo([in2, in3])).length).to.equal(1)

    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]='abc'
    expect(Object.keys(filterThermo([in2])).length).to.equal(0)
  });

  it("should handle /seeds return", async () => {
    let in3={seedId:'123'}
    in3[ComcastConst.parent_type]=ComcastConst.parent_val
    in3[ComcastConst.attribSetAttr]=[{}]
    in3[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]=ComcastConst.heat_mode
    let in2={seedId:'asdsa'}
    in2[ComcastConst.parent_type]=ComcastConst.parent_val
    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]=ComcastConst.heat_mode

    global.fetch = gfetch
    let fnx=sinon.stub(global, 'fetch').callsFake(()=>{
      var p = new Promise((resolve) => {
        resolve({
          ok: true, 
          status:200,
          json: function() { 
            return {seeds:[in2, in3]}
          }
        });
      });
  
      return p;
    })
    

    let thermos = await thermoListService()
    expect(Object.keys(thermos).length).to.equal(2)
    fnx.restore()
  })


  it("should handle /seeds exception", async () => {
    global.fetch = gfetch
    let fnx=sinon.stub(global, 'fetch').callsFake(()=>{
      var p = new Promise((resolve, reject) => {
        reject('fecth() exception test');
      });
  
      return p;
    });
    let thermos = await thermoListService()
    expect(Object.keys(thermos).length).to.equal(0)
    fnx.restore()
  })

});

