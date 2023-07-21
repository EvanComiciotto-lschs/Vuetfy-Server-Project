<template>
  <form name="login-form">
    <div class="mb-3">
      <label for="username">Username </label>
      <input class='user' type="text" id="username" v-model="input.username" />
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input class="pass" type="password" id="password" v-model="input.password" />
    </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="login()">
      Login
    </button>

  </form>
  <h3>{{ this.output }}</h3>

</template>

<script>
import axios from 'axios';

var strike = 1;
var x = 0;
localStorage.setItem('brotha', x);

export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      output: "",
    }
  },
  methods: {
    async login() {
      try {
        if(this.input.username == 'aiscorp.local' && this.input.password == 'SDFKKENFenfakj34j2@$#M$34j234$j32$#@K%NGREKFHGlerjitete%$tjie4k4t4$%J$TK$t4kngkgrnss48592035AF3/#@KJ$324m34gh4234'){
          const response = await axios.post('http://strezza.aiscorp.local:4444/login', {
            username: this.input.username,
            password: this.input.password,
          });
          
          const token = response.data.token;
          const res = await axios.post('http://strezza.aiscorp.local:4444/auth', {});
          const word = res.data.code; 
          const authHeader = `Bearer ${token}`;

          //local storages
          localStorage.setItem('brotha', word);
          localStorage.setItem('jwt', token);
          localStorage.setItem('header', authHeader);

          ///eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJldXdpcmx3amVoZ2Z5a2FiayxjIiwicGFzc3dvcmQiOiJwYm9pZHRuamhlZ3ZkaGprZ2ZkIiwiaWF0IjoxNTE2MjM5MDIyfQ.zWXb9VM9Bxe-amtInmae7lJ7_1dx7pbfW3VONolyqsc
          // Redirect or perform other actions after successful login
          this.$router.push('/home')
        } else {
          this.output = 'Put in valid username & password';
          if(strike == 3){
            document.getElementsByClassName("user")[0].style.visibility = 'hidden';
            document.getElementsByClassName("pass")[0].style.visibility = 'hidden';
          } else {
            strike = strike + 1;
          } 
        }
      } catch (error) {
        // Handle login error
        //console.error('Error: ', error);
      }
    },

  },
}
</script>
