<template>
    <div class="card text-center m-3">
        <div class="card-body">
            <notification />
            <h1 class="header">Servers</h1>
            <div id="server-bar">
                <input type="text" v-model="serverSearchKeyword" placeholder="Search Servers" />
            </div>


            <table class="styled-table">
                <thead>
                    <tr>
                        <!-- Add click events and icons for sorting -->
                        <th class="vm" @click="sortServers('VMName')">VM Name {{ getSortingIcon('VMName') }}</th>
                        <th class="stat status_row_cell" @click="sortServers('Status')">Status {{ getSortingIcon('Status') }}</th>
                        <th class="ip" @click="sortServers('IP')">IP {{ getSortingIcon('IP') }}</th>
                        <th class="time" @click="sortServers('LastCheckInTime')">Last Check-In Time {{
                            getSortingIcon('LastCheckInTime') }}</th>
                        <th class="hv" @click="sortServers('HyperVisor')">HyperVisor {{ getSortingIcon('HyperVisor') }}</th>
                        <th class="host" @click="sortServers('Hostname')">Hostname {{ getSortingIcon('Hostname') }}</th>
                        <th class="Cost" @click="sortServers('cost')">Cost {{ getSortingIcon('cost') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="server in filteredServers" :key="server.VMName">
                        <td>{{ server.VMName }}</td>
                        <td class="status_row_cell">
                            <div class="status_row" v-if="server.Status === 'Running'"><div class="running"></div><div class="status_text">{{ server.Status }}</div></div>
                            <div class="status_row" v-else><div class="offline"></div><div class="status_text">{{ server.Status }}</div></div>
                        </td>
                        <td>{{ server.IP }}</td>
                        <td>{{ dateToString(server.LastCheckInTime) }}</td>
                        <td>{{ server.HyperVisor }}</td>
                        <td>{{ server.Hostname }}</td>
                        <td>{{ calculateCost(server.cost) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import notification from './notification.vue';
import router from './router/index.js';
const serverSearchKeyword = ref('');
var servers = ref(null);

//localStorages
const ong = localStorage.getItem('brotha');
const token = localStorage.getItem('jwt');
const auth = localStorage.getItem('header');

const calculateCost = (sizeInGB) => {
    return (sizeInGB * 0.13).toFixed(2); // Multiply size by 0.13 and round to 2 decimal places
};

function dateToString(old_date) {
    let date = new Date(old_date);
    return `${(date.getHours() % 12 == 0 ? 12 : date.getHours() % 12).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${date.getHours() >= 12 ? "PM" : "AM"} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

if (ong === 'lnzJe2rnW3fssC2aGuOhkBWmukFGezDlk9yZaLtE0kdC5PZXp20EwVLU9UWibIiSFgNJfvZi8DO7pTghhHHTHkWdbyCvngkmXiY5ZXbsjl0XxnPGlwkVkgVo7kCgbknRN991FMdjeY6SeSf6ImylDy0DXIyfkKYclpvmWrCr2aiYaT0w6pVZAvxj1IDHKnuSMmUOQ4jHdE5qMKpvfepe5o2VDYDixXGMAYGpvNc7TdKyUUK7y3n0qiJ2AE8IGD5RdYKd2W0cpuOHwAeBZ44j1E75joAXoGl8UCaMGzLiZtMgcVvDlbCmLKfZnJEDc5tVTj0waoqYxTzzbXwCSo8QZLH2Aevt2rj' && auth === 'Bearer ' + token) {
    console.log('hello');
    onMounted(() => {
        fetch('https://itassets.aiscorp.com:3000/servers', {
            headers: {
                auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
            },
        })
            .then(response => response.json())
            .then(data => {
                servers.value = data;
            })
            .catch(error => {
                console.error('Error fetching server data:', error);
            });
    });
} else {
    router.push('/');
}

const customSortServers = (a, b, property) => {
    const sortOrder = sortingOrders[property];
    const valueA = a[property];
    const valueB = b[property];
    if (valueA === null) return 1;
    if (valueB === null) return -1;
    if (property === 'IP') {
        const ipPartsA = valueA.split('.').map(Number);
        const ipPartsB = valueB.split('.').map(Number);

        for (let i = 0; i < 4; i++) {
            if (ipPartsA[i] < ipPartsB[i]) return sortOrder === 'asc' ? -1 : 1;
            if (ipPartsA[i] > ipPartsB[i]) return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    }
    return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
};

const sortServers = (property) => {
    toggleSortingOrder(property); // Toggle the sorting order first
    servers.value.sort((a, b) => customSortServers(a, b, property));
};



const filteredServers = computed(() => {
    if (!serverSearchKeyword.value) {
        return servers.value;
    }
    return servers.value.filter(server => (server.VMName + server.Status + server.IP + server.HyperVisor + server.Hostname).toLowerCase().includes(serverSearchKeyword.value.toLowerCase()));
});



const sortingOrders = {
    VMName: 'asc',
    Status: 'asc',
    IP: 'asc',
    LastCheckInTime: 'asc',
    HyperVisor: 'asc',
    Hostname: 'asc',
    cost: 'asc',
};

const getSortingIcon = (column) => {
    // Return appropriate icon based on the sorting order
    if (sortingOrders[column] === 'asc') {
        return '\u25B2'; // Upward-pointing triangle
    } else {
        return '\u25BC'; // Downward-pointing triangle
    }
};

const toggleSortingOrder = (column) => {
    // Toggle the sorting order for the given column
    sortingOrders[column] = sortingOrders[column] === 'asc' ? 'desc' : 'asc';
};
</script>
  
<style scoped>
.running {
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    background-color: lime;
}

.offline {
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    background-color: red;
}

.status_row_cell {
    min-width: 0 !important;
}

.status_row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.status_text {
    padding-left: 1rem;
}

#server-bar {
    border: 1px solid rgb(206, 206, 206);
    background-color: #f3f5ff;
    width: 195px;
    margin-left: 10px;
    margin-left: auto;
    margin-right: auto;
}

input[type="text"] {
    text-align: center;
}

#database-bar {
    border: 1px solid rgb(206, 206, 206);
    background-color: #f3f5ff;
    width: 195px;
    margin-left: 10px;
    margin-left: auto;
    margin-right: auto;
}

.vm:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.stat:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.ip:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.time:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.hv:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.host:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.Cost:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.dName:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.dSize:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.dPath:hover {
    background-color: #af2525;
    scale: 105%;
    transition: ease 0.5s;
}

.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    max-width: 1200px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    margin-left: auto;
    margin-right: auto;

}

.styled-table thead tr {
    background-color: #e92e2e;
    color: #ffffff;
    text-align: center;
}

.styled-table tbody tr:nth-of-type(even):focus {
    background-color: #f3f3f3;
}

.styled-table tbody tr:hover {
    background-color: #9c9c9c;
}

.styled-table tbody tr:nth-of-type(even):hover {
    background-color: #9c9c9c;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
    min-width: 200px;
}

.styled-table tbody tr:nth-of-type(red) {
    background-color: #eb9696;
}

.styled-table tbody tr {
    background-color: #e0e0e0;
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    background-color: #ffffff;
    border-bottom: 2px solid #e92e2e;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}


h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>