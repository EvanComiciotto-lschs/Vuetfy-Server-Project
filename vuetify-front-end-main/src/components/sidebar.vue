<script>
import { ref, provide } from 'vue';
import { collapsed, toggleSidebar, sidebarWidth, } from './state';
import toggleDataTable from './state';
export default {
  props: {},
  setup() {
    function sidebarServers() {
      toggleDataTable.value = true;
      console.log('sidebarServers function called');
      console.log(toggleDataTable.value);
    }
    function sidebarDataTable() {
      toggleDataTable.value = false;
      console.log(toggleDataTable.value);
    }
    provide('toggleDataTable', toggleDataTable);
    return {
      collapsed,
      toggleSidebar,
      sidebarWidth,
      sidebarServers,
      sidebarDataTable
    };
  }
};

</script>

<template>
    <div class ="sidebar" :style="{width:sidebarWidth}">
    <span class="collapse-icon" @click="toggleSidebar" >
        <img class ="pic" src = "https://i.ibb.co/SwX2N5z/Aegis-Logo-Transparent-Backgrounds.png">
    </span>
    <span class="item" @click="sidebarServers()" v-if ="collapsed">
        <img class = "pic" src="https://i.ibb.co/hgFvjn2/Server-Logo-Final.png">
    </span> 
    <span v-else class = "item" @click="sidebarServers()">
        <img class = "pic" src="https://i.ibb.co/hgFvjn2/Server-Logo-Final.png">
        Servers
    </span>
    <span class="item" id="dt" @click="sidebarDataTable()" v-if="collapsed">
        <img class = "pic" src="https://cdn2.iconfinder.com/data/icons/text-editing-glyph-black/614/3819_-_Insert_Table-512.png">
    </span>
    <span v-else class = "item" id = "dataLabel"  @click="sidebarDataTable()">
        <img class = "pic" src="https://cdn2.iconfinder.com/data/icons/text-editing-glyph-black/614/3819_-_Insert_Table-512.png">
        Databases
    </span>
    </div>
</template>

<style>
    :root {
        --sidebar-bg-color: black;
        --sidebar-item-hover: white;
        --sidebar-item-active: #ef3b32;
    }
</style>

<style scoped>
    .sidebar {
        color: #708490;
        background-color: var(--sidebar-bg-color);
        float: left;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        bottom: 0;
        padding: 0.5em;
        transition: 0.3s, ease;
        display: flex;
        flex-direction: column;
    }
    .collapse-icon {
        position: absolute;
        top: 0;
        padding: 0.75em;
    }
    .collapse-icon:hover {
        transform: scale(115%);
    }
    .pic {
        height: 50px;
        width: 50px;
    }
    .item{
        position: absolute;
        top: 300px;
        padding: 0.75em;
        color: white;
    }
    .item:hover{
        transform: scale(115%);
        transition: ease 0.2s;
    }
    #dt{
        top: 375px;
    }
    #dataLabel{
        top: 375px;
    }
</style>