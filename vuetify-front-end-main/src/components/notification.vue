<script>
import {ref} from 'vue';
export default {
    data(){
        return {
            messageCheck : ref(true),
        }
    }
}

var int = 3;
</script>

<template>
    <div class="message" v-if="messageCheck">
        <p>example</p>
    </div>
    <div v-else></div>
</template>

<style>
    .message{
        width: 100%;
        background-color: #ef3b32;
        border-color:black;
        border: 1px solid;
    }
</style>