<script>
import {collapsed, toggleSidebar, sidebarWidth} from './state'

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
        color: black;
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
        color: black;
    }
    .pic {
        height: 50px;
        width: 50px;
    }
</style>