<template>
  <div class="card text-center m-3">
    <div class="card-body">
      <notification />
      <h1 class="header" v-if="toggleDataTable.value == 'about'"></h1>
      <h1 class="header" v-else-if="toggleDataTable.value === 'database'">Databases</h1>
      <h1 class="header" v-else>Servers</h1>
      <div id="server-bar" v-if="toggleDataTable.value !== 'about' && toggleDataTable.value !== 'database'">
        <input type="text" v-model="serverSearchKeyword" placeholder="Search Name" />
      </div>
      <div id="database-bar" v-if="toggleDataTable.value === 'database'">
        <input type="text" v-model="databaseSearchKeyword" placeholder="Search Name or Path" />
      </div>
      
      <div v-if="toggleDataTable.value == 'about'">
        <aboutPage></aboutPage>
        <!--ABOUT PAGE CAN BE BUILT HERE
            OR DESIGNED IN ANOTHER COMPONENT AND IMPORTED-->
      </div>

      <table v-else-if="toggleDataTable.value === 'database'" class="styled-table">
        <thead>
          <tr>
            <th class="dName" @click="sortDatabases('name')">Name</th>
            <th class="dSize" @click="sortDatabases('size')">Size in GB</th>
            <th class="dPath" @click="sortDatabases('paths')">Path</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="database in filteredDatabases" :key="database.name">
            <td>{{ database.name }}</td>
            <td>{{ database.size }}</td>
            <td>
              <span v-for="path in database.paths" :key="path">{{ path }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <table v-else="toggleDataTable" class="styled-table">
        <thead>
          <tr>
            <th class="vm" @click="sortServers('VMName')">VM Name</th>
            <th class="stat" @click="sortServers('Status')">Status</th>
            <th class="ip" @click="sortServers('IP')">IP</th>
            <th class="time" @click="sortServers('LastCheckInTime')">Last Check-In Time</th>
            <th class="hv" @click="sortServers('HyperVisor')">HyperVisor</th>
            <th class="host" @click="sortServers('Hostname')">Hostname</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="server in filteredServers" :key="server.VMName">
            <td>{{ server.VMName }}</td>
            <td>
              <div class="running" v-if="server.Status === 'Running'"></div>
              <div class="offline" v-else></div>
            </td>
            <td>{{ server.IP }}</td>
            <td>{{ server.LastCheckInTime }}</td>
            <td>{{ server.HyperVisor }}</td>
            <td>{{ server.Hostname }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import toggleDataTable from './state.js';
import notification from './notification.vue';
import aboutPage from "./aboutPage.vue";
import router from './router/index.js';
const serverSearchKeyword = ref('');
const databaseSearchKeyword = ref('');
var servers = ref(null);
var databases = ref(null);
console.log(toggleDataTable.value);

//localStorages
const ong = localStorage.getItem('brotha');
const token = localStorage.getItem('jwt');
const auth = localStorage.getItem('header');

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

    fetch('https://itassets.aiscorp.com:3000/databases', {
      headers: {
        auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
      },
    })
      .then(response => response.json())
      .then(data => {
        databases.value = data;
      })
      .catch(error => {
        console.error('Error fetching database data:', error);
      });
  });
} else {
  router.push('/');
}

const filteredServers = computed(() => {
  if (!serverSearchKeyword.value) {
    return servers.value;
  }
  return servers.value.filter(server => server.VMName.toLowerCase().includes(serverSearchKeyword.value.toLowerCase()));
});


const filteredDatabases = computed(() => {
  if (!databaseSearchKeyword.value) {
    return databases.value;
  }
  const keywordTwo = databaseSearchKeyword.value.toLowerCase();
  return databases.value.filter(databases => databases.name.toLowerCase().includes(keywordTwo));
});

const customSort = (a, b, property) => {
  const valueA = a[property];
  const valueB = b[property];
  if (valueA === null) return 1;
  if (valueB === null) return -1;
  if (property === 'IP') {
    const ipPartsA = valueA.split('.').map(Number);
    const ipPartsB = valueB.split('.').map(Number);

    for (let i = 0; i < 4; i++) {
      if (ipPartsA[i] < ipPartsB[i]) return -1;
      if (ipPartsA[i] > ipPartsB[i]) return 1;
    }
    return 0;
  }
  return valueA.localeCompare(valueB);
};

const sortServers = (property) => {
  servers.value.sort((a, b) => customSort(a, b, property));
};

// Custom sorting function for databases
const customSortDatabases = (a, b, property) => {
  const valueA = a[property];
  const valueB = b[property];
  if (valueA === null) return 1;
  if (valueB === null) return -1;
  if (property === 'size') {
    return valueA - valueB;
  }
  if (property === 'paths') {
    return valueA[0].localeCompare(valueB[0]);
  }
  return valueA.localeCompare(valueB);
};

// Sorting function for databases
const sortDatabases = (property) => {
  databases.value.sort((a, b) => customSortDatabases(a, b, property));
};
</script>

<style scoped>

.running {
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: lime;
  /*border: 1px solid black;*/
  margin: auto;
  
}

.offline {
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: red;
  /*border: 1px solid black;*/
  margin: auto;
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

.stat:hover{
  background-color: #af2525;
  scale: 105%;
  transition: ease 0.5s;
}

.ip:hover{
  background-color: #af2525;
  scale: 105%;
  transition: ease 0.5s;
}

.time:hover{
  background-color: #af2525;
  scale: 105%;
  transition: ease 0.5s;
}

.hv:hover{
  background-color: #af2525;
  scale: 105%;
  transition: ease 0.5s;
}

.host:hover{
  background-color: #af2525;
  scale: 105%;
  transition: ease 0.5s;
}
.dName:hover{
  background-color: #af2525;
  scale: 105%;
  transition: ease 0.5s;
}
.dSize:hover{
  background-color: #af2525;
  scale: 105%;
  transition: ease 0.5s;
}
.dPath:hover{
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
.styled-table tbody tr:hover{
  background-color: #9c9c9c;
}
.styled-table tbody tr:nth-of-type(even):hover{
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
    background-color:#e0e0e0;
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