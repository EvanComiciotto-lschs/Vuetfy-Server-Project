<template>
  <sidebar/>
  <div :style="{'margin-left':sidebarWidth}">
  <v-app>
    <v-main>
      <img src="https://th.bing.com/th/id/R.b139cbac71658605b146179bcb889b98?rik=d4I%2b8FPfCNlboA&riu=http%3a%2f%2fztechservices.com%2fimages%2faegis-logo-2019.png&ehk=NyJDg0fkvIUfeLNHM0x1FNAE3lbfJmJgcZUkRk2%2fKAg%3d&risl=&pid=ImgRaw&r=0">
      <dare/>
    </v-main>
  </v-app>
  </div>
</template>

<script setup lang="js">
  import dare from './components/open.vue'
  import sidebar from './components/sidebar.vue'
  import {sidebarWidth} from './components/state.js'
</script>

<style>
  body {
    background-color: black;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    }
</style>
