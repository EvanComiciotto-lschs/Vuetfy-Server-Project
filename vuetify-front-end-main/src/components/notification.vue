<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const messages = ref("Hello, Vue!");
    const messageTime = ref("");
    var messageCheck = ref(false);

    onMounted(async () => {
      let resp = await fetch('https://itassets.aiscorp.com:3000/messages');
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
    return {
      messages,
      messageTime,
      messageCheck,
    };
  },
  methods: {
    hideMessage() {
        this.messageCheck = false;
      }

  }
};

</script>

<template>
  <div class="messageDisplay" v-if="messageCheck">
    <p><b style="display:inline-block">{{ messageTime }} :</b></p>
    <p><b id = "messageBody">{{ messages }}</b></p>
    <button @click="hideMessage()" class="Xbutton"><b>x</b></button>
  </div>
  <div v-else></div>
</template>

<style>
.messageDisplay {
  width: 100%;
  background-color: #00bbbb;
  color: white;
  display: flex;
}
.Xbutton{
  float: right;
  padding-left: 79%;
}
#messageBody{
  padding-left: 1rem;
  display:inline-block;
}
</style>