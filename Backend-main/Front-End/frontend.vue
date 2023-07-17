<template>
    <div class="card text-center m-3">
  
      <h5 class="card-header">Simple GET Request</h5>
  
      <div class="card-body">
  
        <table class="table">
  
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
  
            <tr v-for="item in Servers" :key="item.VMName">
  
              <td>{{ item.VMName }}</td>
              <td>{{ item.Status }}</td>
              <td>{{ item.IP }}</td>
              <td>{{ item.LastCheckInTime }}</td>
              <td>{{ item.HyperVisor }}</td>
              <td>{{ item.Hostname }}</td>
  
            </tr>
  
          </tbody>
  
        </table>
  
      </div>
  
    </div>
  
  </template>
  
  <script setup>
  
  import { ref, onMounted } from 'vue';
  
  var Servers = ref(null);
  
  onMounted(() => {
    fetch('http://jwerts.aiscorp.local:6284/servers')
      .then(response => response.json())
      .then(data => {
        Servers.value = data.Servers;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });  
  });
  
  </script>

  <style scoped>
  
  table {
    width: 100%;
    border-collapse: collapse;  
}
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th span {
    font-size: 10px;
    margin-left: 4px;
  }
  </style>