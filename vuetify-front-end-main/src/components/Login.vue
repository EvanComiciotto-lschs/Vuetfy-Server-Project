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
  //import { SET_AUTHENTICATION, SET_USERNAME } from "../store/storeconstants";

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
          const response = await axios.post('http://localhost:4000/login', {
            username: this.input.username,
            password: this.input.password,
          });

          const token = response.data.token;

          console.log(token);

          // Store the JWT securely (e.g., in localStorage)
          localStorage.setItem('jwt', token);
          // Redirect or perform other actions after successful login
        } catch (error) {
          // Handle login error
          //console.error('Error: ', error);
        }
      },
    },
  }