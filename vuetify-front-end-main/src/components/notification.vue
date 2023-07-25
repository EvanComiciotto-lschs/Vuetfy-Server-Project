<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const messages = ref("Hello, Vue!");
    const messageCheck = ref(false)

    onMounted(async () => {
      let resp = await fetch('http://4.246.161.216:3000/messages');
      if (resp.ok) {
        messages.value = await resp.text();
        console.log('Response string:', messages.value);
        messageCheck.value = messages.value.length > 0;
      } else {
        console.error('Error fetching data:', error);
      }
    });
    
    return {
      messages,
      messageCheck
    };
  }
};

</script>

<template>
  <div class="message" v-if="messageCheck">
    <p>{{ messages }}</p>
  </div>
  <div v-else></div>
</template>

<style>
.message {
  width: 100%;
  background-color: #ef3b32;
  border-color: black;
  border: 1px solid;
}
</style>