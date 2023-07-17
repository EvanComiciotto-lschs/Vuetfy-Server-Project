<template>
    <form name="login-form">
      <div class="mb-3">
        <label for="username">Username: </label>
        <input type="text" id="username" v-model="input.username" />
      </div>
      <div class="mb-3">
        <label for="password">Password: </label>
        <input type="password" id="password" v-model="input.password" />
      </div>
      <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="login()">
        Login
      </button>

    </form>
    <h3>Output: {{ this.output }}</h3>
  
  </template>
  
  <script>
  import axios from 'axios';

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
            if(this.input.username == 'aiscorp.local' && this.input.password == 'Fahd'){
                const response = await axios.post('http://strezza.aiscorp.local:4000/login', {
                    username: this.input.username,
                    password: this.input.password,
                });

                const token = response.data.token;

                //console.log(token);

                // Store the JWT securely (e.g., in localStorage)
                localStorage.setItem('jwt', token);
                // Redirect or perform other actions after successful login
                this.$router.push('/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJldXdpcmx3amVoZ2Z5a2FiayxjIiwicGFzc3dvcmQiOiJwYm9pZHRuamhlZ3ZkaGprZ2ZkIiwiaWF0IjoxNTE2MjM5MDIyfQ.zWXb9VM9Bxe-amtInmae7lJ7_1dx7pbfW3VONolyqsc')
        }
        } catch (error) {
          // Handle login error
          //console.error('Error: ', error);
        }
      },
    },
  }