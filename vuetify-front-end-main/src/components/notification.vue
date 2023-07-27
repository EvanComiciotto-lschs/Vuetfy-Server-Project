<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const messages = ref("Hello, Vue!");
    const messageTime = ref("");
    var messageCheck = ref(false);

    onMounted(async () => {
      let resp = await fetch('http://4.246.161.216:3000/messages');
      if (resp.ok) {
        const data = await resp.json();
        console.log(data)
        messages.value = data.message;
        // Thu Jul 27 2023 09:57:48
        messageTime.value = new Date(data.timestamp).toLocaleString();
        messageCheck.value = messages.value.length > 0;
      } else {
        console.error('Error fetching data:', error);
      }
    });
    function hideMessage() {
        messageCheck = ref(false);
        console.log(messageCheck.value);
      }


    return {
      messages,
      messageTime,
      messageCheck,
      hideMessage
    };
  },
};

</script>

<template>
  <div class="message" v-if="messageCheck">
    <p>{{ messageTime }}: {{ messages }}</p> 
    <button @click="hideMessage()">X</button>
    
  </div>
  <div v-else></div>
</template>

<style>
.message {
  width: 100%;
  background-color: #00bbbb;
  border-color: black;
  border: 1px solid;
}
</style>