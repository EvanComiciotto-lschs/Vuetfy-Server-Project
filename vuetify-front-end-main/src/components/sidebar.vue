<script>
import {collapsed, toggleSidebar, sidebarWidth} from './state'
import {showServersTable} from './open.vue'
    export default{
        props: {},
        setup () {
            return {collapsed, toggleSidebar, sidebarWidth, showServersTable, toggleDataTable ,toggleServersTable}
        }
    }
    const toggleServersTable = ()=> (showServersTable.value = ref(true))
    const toggleDataTable = ()=> (showServersTable.value = ref(false))
</script>

<template>
    <div class ="sidebar" :style="{width:sidebarWidth}">
    <span class="collapse-icon" @click="toggleSidebar">
        <img class ="pic" src = "https://www.iotone.com/files/vendor/aegis-software_8.jpg">
    </span>
    <span class="item" @click="toggleServersTable">
        <img class = "pic" src="https://th.bing.com/th/id/R.de9f93de1dcf4db07c44f7c5d476f1ce?rik=0oESb6sMiR%2bntQ&riu=http%3a%2f%2ffindicons.com%2ffiles%2ficons%2f2711%2ffree_icons_for_windows8_metro%2f512%2fvirtual_machine.png&ehk=mvrMmkq1MxXm2OEahSa8s6d4xm9%2fwWxSfqfocTQOZEA%3d&risl=&pid=ImgRaw&r=0">
    </span> 
    <span class="item" id="dt" @click="toggleDataTable">
        <img class = "pic" src="https://cdn2.iconfinder.com/data/icons/text-editing-glyph-black/614/3819_-_Insert_Table-512.png">
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
    }
    .item:hover{
        transform: scale(115%);
        transition: ease 0.2s;
    }
    #dt{
        top: 375px;
    }
</style>