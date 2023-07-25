<template>
  <sidebar/>
  <div :style="{'margin-left':sidebarWidth}">
  <v-app>
    <v-main>
      <img height="150" src="/src/assets/aegislogo.png">
        <!--<dare/>-->
        <RouterView/>
    </v-main>
  </v-app>
  </div>
</template>

<script setup lang="js">
  //import dare from './components/open.vue'
  import sidebar from './components/sidebar.vue'
  import {sidebarWidth} from './components/state.js'
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    }
</style>
