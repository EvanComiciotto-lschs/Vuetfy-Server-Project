<script>
    import {ref} from 'vue';
    export default {
        data(){
            return {
                message : ref(''),
                sendMsg: ""
            }
        },
        methods: {
            async fill() {
                let resp = await fetch("http://4.246.161.216:3000/messages/", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    //make sure to serialize your JSON body
                    body: JSON.stringify({
                        message: this.message
                    })
                });
                this.sendMsg = resp.ok?"Message Sent":"Error sending message!";
            }
    },
}
</script>

<template>
    <div>
        <input class="in" type="text" v-model="message" placeholder="Send a message">
        <button @click="fill()" style="border: 2px solid; padding: 5px"> Submit </button>
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