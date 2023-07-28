<script>
import { ref } from 'vue';
import router from './router/index.js';
//const token = localStorage.getItem('jwt');
//const auth = localStorage.getItem('header');
var t = false;


export default {
    data() {
        return {
            message: ref(''),
            sendMsg: "",
            currentTime: ""
        }
    },

    methods: {
        async fill() {
            if(t == false){
                router.push('/')
            } else {
                let resp = await fetch("https://itassets.aiscorp.com:3000/messages/", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
                    },

                    //make sure to serialize your JSON body
                    body: JSON.stringify({
                        message: this.message,
                        timestamp: Date.now()
                    })
                });
                this.sendMsg = resp.ok ? "Message Sent" : "Error sending message!";
            }
        },
        async empty() {
            if(t == false){
                router.push('/')
            } else {
                let resp = await fetch("https://itassets.aiscorp.com:3000/messages/", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
                    },
                    body: JSON.stringify({
                        message: "",
                        timestamp: ""
                    })
                });
            }
        }
    },
}
</script>

<template>
    <div>
        <input class="in" type="text" v-model="message" placeholder="Send a message">
        <button @click="fill()" style="border: 2px solid; padding: 5px"> Submit </button>
        <br/>
        <button @click="empty()" style="border: 2px solid; padding: 5px"> Remove Message</button>
    </div>
    <div>
        <p>{{ sendMsg }}</p>
    </div>
</template>

<style scoped>
.in {
    /* border-radius: 1px !important; */
    padding: 1px 2px !important;
    outline-offset: 0 !important;
    outline: auto 1px !important;
    margin: 1rem !important;
}
</style>