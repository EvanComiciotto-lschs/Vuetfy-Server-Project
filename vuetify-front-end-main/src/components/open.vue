<template>
  <div class="card text-center m-3">
    <div class="card-body">
      <notification/>
      <h1 class="header" v-if="toggleDataTable.value == 'about'"></h1>
      <h1 class="header" v-else-if="toggleDataTable.value =='database'">Databases</h1>
      <h1 class="header" v-else>Servers</h1>
      <div class="search-bar" v-if="toggleDataTable.value != 'about'">
        <input type="text" v-model="searchKeyword" placeholder="Search Name" />
      </div>
      <div v-if="toggleDataTable.value == 'about'">
        <aboutPage></aboutPage>
        <!--ABOUT PAGE CAN BE BUILT HERE
            OR DESIGNED IN ANOTHER COMPONENT AND IMPORTED-->
      </div>

      <table v-else-if="toggleDataTable.value == 'database'" class="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size in GB</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="database in filteredDatabases" :key="database.name">
            <td>{{ database.name }}</td>
            <td>{{ database.size }}</td>
            <td>{{ database.paths }}</td>
          </tr>
        </tbody>
    
      </table>  

      <table v-else="toggleDataTable" class="styled-table">
        <thead>
          <tr>
            <th>VM Name</th>
            <th>Status</th>
            <th>IP</th>
            <th>Last Check-In Time</th>
            <th>HyperVisor</th>
            <th>Hostname</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="server in filteredServers" :key="server.VMName">
            <td>{{ server.VMName }}</td>
            <td>{{ server.Status }}</td>
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
import { ref, onMounted, computed} from 'vue';
import toggleDataTable from './state.js';
import notification from './notification.vue';
import aboutPage from "./aboutPage.vue";
import router from './router/index.js';
const searchKeyword = ref('');
var servers = ref(null);
var databases = ref(null);
console.log(toggleDataTable.value);

//localStorages
const ong = localStorage.getItem('brotha');
const token = localStorage.getItem('jwt');
const auth = localStorage.getItem('header');

if(ong == 'lnzJe2rnW3fssC2aGuOhkBWmukFGezDlk9yZaLtE0kdC5PZXp20EwVLU9UWibIiSFgNJfvZi8DO7pTghhHHTHkWdbyCvngkmXiY5ZXbsjl0XxnPGlwkVkgVo7kCgbknRN991FMdjeY6SeSf6ImylDy0DXIyfkKYclpvmWrCr2aiYaT0w6pVZAvxj1IDHKnuSMmUOQ4jHdE5qMKpvfepe5o2VDYDixXGMAYGpvNc7TdKyUUK7y3n0qiJ2AE8IGD5RdYKd2W0cpuOHwAeBZ44j1E75joAXoGl8UCaMGzLiZtMgcVvDlbCmLKfZnJEDc5tVTj0waoqYxTzzbXwCSo8QZLH2Aevt2rj' && auth == 'Bearer ' + token){
  console.log('hello');
  onMounted(() => {
    fetch('http://4.246.161.216:3000/servers')
      .then(response => response.json())
      .then(data => {
        servers.value = data;
      })
      .catch(error => {
        console.error('Error fetching server data:', error);
      });

    fetch('http://4.246.161.216:3000/databases')
      .then(response => response.json())
      .then(data => {
        databases.value = data;
      })
      .catch(error => {
        console.error('Error fetching database data:', error);
      });
  });
} else {
  router.push('/')
}
const filteredServers = computed(() => {
  if (!searchKeyword.value) {
    return servers.value;
  }
  return servers.value.filter(server => server.VMName.toLowerCase().includes(searchKeyword.value.toLowerCase()));
});


const filteredDatabases = computed(() => {
  if (!searchKeyword.value) {
    return databases.value;
  }
  const keywordTwo = searchKeyword.value.toLowerCase();
  return databases.value.filter(databases => databases.name.toLowerCase().includes(keywordTwo));
});

</script>

<style scoped>
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    margin-left: auto;
    margin-right: auto;

}

.offline {
    background-color: #b12828;
    color: #ffffff;
    text-align: left;
}

.styled-table thead tr {
    background-color: #e92e2e;
    color: #ffffff;
    text-align: left;
}


.styled-table thead tr:hover {
    background-color: #af2525;
    color: #ffffff;
    text-align: left;
}

.styled-table tbody tr:nth-of-type(even):focus {
    background-color: #f3f3f3;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
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
.search-bar {
  margin-left: 10px;
  text-align: left;
}
</style>