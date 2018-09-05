<template>
  <div class="home">
    <h1>Please login</h1>
    <form action='' v-on:submit='login'>
        <input type='text' v-model='account' placeholder='email address' />
        <input type='password'  v-model='password' placeholder='password' />
        <input type='submit' value='Login'  v-bind:class='loginClass'/>
        <p>{{ loginErr }}</p>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import loginService from '@/services/loginService.js'
const loginErrMsg = 'Login failed. Please try again.'

export default {
  name: 'Login',
  data:function(){return {'account':'', 'password':'', 
    'loginErr':'', loginClass:''}},
  methods:{
    login: async function(event){
        event.preventDefault()
        this.loginClass='blinkClass'
        try {
          let loginRet=await loginService(this.account, this.password)
          this.$store.commit('didLogin', {accessToken:loginRet.access_token, 
              userName:loginRet.fullName})
          this.$router.push({'name':'ThermoList'})
          this.loginErr=''
        } catch(e){
            this.loginErr=loginErrMsg
        }
        this.loginClass=''
    }
  },
  components: {

  }
}

</script>
