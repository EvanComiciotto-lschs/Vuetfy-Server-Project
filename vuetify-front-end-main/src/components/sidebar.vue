<script>
import { ref, provide } from 'vue';
import { collapsed, toggleSidebar, sidebarWidth, } from './state';
import toggleDataTable from './state';
export default {
  props: { },
  methods: {
    reloadPage(){
        window.location.reload();
    }
  },
  setup() {
    function updateIcons() {
        [...document.getElementsByClassName("server-icon")].forEach(element => {
            if (toggleDataTable.value == 'server') {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
        [...document.getElementsByClassName("datatable-icon")].forEach(element => {
            if (toggleDataTable.value == 'database') {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
        [...document.getElementsByClassName("about-icon")].forEach(element => {
            if (toggleDataTable.value == 'about') {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    }
    function sidebarServers() {
        toggleDataTable.value = 'server';
        console.log('hello random person who decided to open the console');
        console.log(toggleDataTable.value);
        updateIcons();
    }
    function sidebarDataTable() {
      toggleDataTable.value = 'database';
      console.log(toggleDataTable.value);
        updateIcons();
    }
    function sidebarAbout() {
      toggleDataTable.value = 'about';
      console.log(toggleDataTable.value);
        updateIcons();
    }
    updateIcons();
    provide('toggleDataTable', toggleDataTable);
    return {
      collapsed,
      toggleSidebar,
      sidebarWidth,
      sidebarServers,
      sidebarDataTable,
      sidebarAbout
    };
  }
};

</script>

<template>
    <div class ="sidebar" :style="{width:sidebarWidth}" style="display: flex; flex-direction: column;">
        <div class="collapse-icon" @click="reloadPage" style="display: flex; flex-direction: row;">
            <img class ="pic" src = "/src/assets/Aegis-Logo-Transparent-Backgrounds.png">
            <span v-if="!collapsed"><p class = "label-DONTBREAK0">ITS</p></span>
        </div>
        <div class="spacer"></div>
        <div class="item" @click="sidebarServers()" style="display: flex; flex-direction: row;">
            <i class="bi bi-motherboard-fill server-icon active"></i>
            <span v-if="!collapsed"><p class = "label-DONTBREAK">Servers</p></span>
        </div>
        <div class="item" @click="sidebarDataTable()" style="display: flex; flex-direction: row;">
            <i class="bi bi-database-fill datatable-icon"></i>
            <span v-if="!collapsed"><p class = "label-DONTBREAK">Databases</p></span>
        </div>
        <div class="item" @click="sidebarAbout()" style="display: flex; flex-direction: row;">
            <i class="bi bi-chat-square-text-fill about-icon"></i>
            <span v-if="!collapsed"><p class = "label-DONTBREAK">About</p></span>
        </div>
        <div class="spacer"></div>
        <div class="item" @click="toggleSidebar" style="display: flex; flex-direction: row;">
            <i class="bi bi-layout-sidebar sidebar-toggler"></i>
            <span v-if="!collapsed"><p class = "label-DONTBREAK2">Collapse</p></span>
        </div>
    </div>
</template>

<style>
    :root {
        --sidebar-bg-color: #27272d;
        --sidebar-item-hover: white;
        --sidebar-item-active: #ef3b32;
    }
</style>

<style scoped>
.sidebar-toggler {
    font-size: 3rem;
    color: #708490;
}
.server-icon {
    font-size: 4rem;
    color: #708490;
}
.server-icon.active {
    color: #ef3b32;
}
.datatable-icon {
    font-size: 4rem;
    color: #708490;
}
.datatable-icon.active {
    color: #ef3b32;
}
.about-icon {
    font-size: 4rem;
    color: #708490;
}
.about-icon.active {
    color: #ef3b32;
}
.icon {
    height: 4rem;
    width: 4rem;
}
.spacer {
    flex-grow: 10;
}
.label-DONTBREAK {
    color: lightgray;
    padding-top: 2rem;
    padding-left: 1rem;
}
.label-DONTBREAK2 {
    color: lightgray;
    padding-top: 1.5rem;
    padding-left: 1rem;
}
.label-DONTBREAK0 {
    color: lightgray;
    padding-top: 1rem;
    padding-left: 1rem;
    font-weight: bold;
}

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
    /* .item{
        position: absolute;
        top: 300px;
        padding: 0.75em;
        color: white;
        
    }
    .item:hover{
        transform: scale(115%);
        transition: ease 0.2s;
    } */
    #dt{
        top: 375px;
    }
    #dataLabel{
        top: 375px;
    }
    .textLabel{
        display: inline-block;
        bottom:  25px;
        left: 75px;
        position: absolute;
    }
    #databasesLabel{
        bottom: 32px;
        position: absolute;
    }
</style>