<script>
import {collapsed, toggleSidebar, sidebarWidth} from './state'
import {showServersTable} from './open.vue'
    export default{
        props: {},
        setup () {
            return {collapsed, toggleSidebar, sidebarWidth}
        }
    }
</script>

<template>
    <div class ="sidebar" :style="{width:sidebarWidth}">
    <span class="collapse-icon" @click="toggleSidebar">
        <img class ="pic" src = "https://www.iotone.com/files/vendor/aegis-software_8.jpg">
    </span>
    <span class="item" @click="showServersTable">
        <img class = "vmach" src="https://th.bing.com/th/id/R.de9f93de1dcf4db07c44f7c5d476f1ce?rik=0oESb6sMiR%2bntQ&riu=http%3a%2f%2ffindicons.com%2ffiles%2ficons%2f2711%2ffree_icons_for_windows8_metro%2f512%2fvirtual_machine.png&ehk=mvrMmkq1MxXm2OEahSa8s6d4xm9%2fwWxSfqfocTQOZEA%3d&risl=&pid=ImgRaw&r=0">
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
    .pic {
        height: 50px;
        width: 50px;
    }
    .item{
        position: absolute;
        top: 100;
        padding: 0.75em;
    }
    .item:hover{
        transform: scale(115%);
    }
</style>