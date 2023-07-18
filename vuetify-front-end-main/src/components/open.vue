<template>
  <div class="card text-center m-3">
    <div class="card-body">

      <h1 class="header" v-if="toggleDataTable.value">Servers</h1>
      <h1 class="header" v-else>Databases</h1>
      <table v-if="toggleDataTable.value" class="table">
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
          <tr v-for="server in servers" :key="server.VMName">
            <td>{{ server.VMName }}</td>
            <td>{{ server.Status }}</td>
            <td>{{ server.IP }}</td>
            <td>{{ server.LastCheckInTime }}</td>
            <td>{{ server.HyperVisor }}</td>
            <td>{{ server.Hostname }}</td>
          </tr>
        </tbody>
      </table>

      <table v-else class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size in GB</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="database in databases" :key="database.name">
            <td>{{ database.name }}</td>
            <td>{{ database['size in GB'] }}</td>
            <td>{{ database.path }}</td>
          </tr>
        </tbody>
      </table>  
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, inject} from 'vue';
import toggleDataTable from './state.js';
//import { toggleDataTable } from './sidebar.vue';
var servers = ref(null);
var databases = ref(null);
//var toggleDataTable = inject('toggleDataTable', false)
//console.log('toggle data table variable ' + toggleDataTable);


onMounted(() => {
  fetch('http://fkhan.aiscorp.local:6285/servers')
    .then(response => response.json())
    .then(data => {
      servers.value = data;
    })
    .catch(error => {
      console.error('Error fetching server data:', error);
    });

  fetch('http://fkhan.aiscorp.local:6285/databases')
    .then(response => response.json())
    .then(data => {
      databases.value = data;
    })
    .catch(error => {
      console.error('Error fetching database data:', error);
    });
});

</script>


<style scoped>
.table {
  width: 100%;
  border: 1px solid;
  background-color: #708490;
  font-family: HKGrotesk-regular; 
  color: white;
}

th {
  background-color: #ef3b32;
  color: white;
}

td {
  padding: 8px;
  text-align: left;
  border: 1px solid #000000;
  border-bottom: 1px solid #000000;
}

tr:hover {
  background-color: #9dafb9;
}

.checkbox-container {
  display: flex;
  justify-content: flex-end;
  font-family: HKGrotesk-Bold;
  font-weight: bold;
  margin-bottom: 10px;
}
.header{
  font-weight: bold;
}

.form-check {
  margin-right: 10px;
}
</style>