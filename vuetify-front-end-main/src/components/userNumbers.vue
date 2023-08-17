<template>
    <div class="data">
        <p :key="componentKey"><span class ="b">Total Users: </span>{{ data.totalUsers }}</p>
        <p :key="componentKey2"><span class ="b">Service Accounts: </span>{{ data.serviceAccounts }}</p>
    </div>
</template>
 
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const componentKey = ref(0);
const componentKey2 = ref(0);

type UsersResponse = {
    departments: {} | null,
    totalUsers: number | null,
    serviceAccounts: number | null,
    title: {} | null,
    manager: {} | null,
}

let data: UsersResponse = { departments: null, totalUsers: -1, serviceAccounts: -1, title: null, manager: null };

onMounted(async () => {
    // Fetch data from the server
    let resp = await fetch('https://itassets.aiscorp.com:3000/users', {
        headers: {
            auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
        },
    });

    if (resp.ok) {
        data = (await resp.json() as UsersResponse);
        forceRerender();
    } else {
        console.error('Error fetching data:');
    }
});

const forceRerender = () => {
    componentKey.value += 1;
    componentKey2.value += 1;
};
</script>

<style scoped>
.b{
    font-weight: bold;
}
</style>