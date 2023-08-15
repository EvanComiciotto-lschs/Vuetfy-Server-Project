<template>
    <div class="card text-center m-3">
        <div class="card-body">
            <notification />
            <h1 class="header">Azure Databases</h1>
            <div id="database-bar">
                <input type="text" v-model="databaseSearchKeyword" placeholder="Search Databases" />
            </div>


            <table class="styled-table">
                <thead>
                    <tr>
                        <!-- Add click events and icons for sorting -->
                        <th class="dName" @click="sortDatabases('name')">Name {{ getSortingIcon('name') }}</th>
                        <th class="dSize" @click="sortDatabases('size')">Size in GB {{ getSortingIcon('size') }}</th>
                        <th class="dPath" @click="sortDatabases('paths')">Path {{ getSortingIcon('paths') }}</th>
                        <th class="dCost1" @click="sortDatabases('size')">Cost of Database {{ getSortingIcon('size') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="database in filteredDatabases" :key="database.name">
                        <td>{{ database.name }}</td>
                        <td>{{ database.size }}</td>
                        <td>
                            <span v-for="path in database.paths" :key="path">{{ path }}</span>
                        </td>
                        <td class="dCost">{{ calculateCost(database.size) }}</td>
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
const databaseSearchKeyword = ref('');
var databases = ref(null);

//localStorages
const ong = localStorage.getItem('brotha');
const token = localStorage.getItem('jwt');
const auth = localStorage.getItem('header');

const calculateCost = (sizeInGB) => {
    return (sizeInGB * 0.13).toFixed(2); // Multiply size by 0.13 and round to 2 decimal places
};

if (ong === 'lnzJe2rnW3fssC2aGuOhkBWmukFGezDlk9yZaLtE0kdC5PZXp20EwVLU9UWibIiSFgNJfvZi8DO7pTghhHHTHkWdbyCvngkmXiY5ZXbsjl0XxnPGlwkVkgVo7kCgbknRN991FMdjeY6SeSf6ImylDy0DXIyfkKYclpvmWrCr2aiYaT0w6pVZAvxj1IDHKnuSMmUOQ4jHdE5qMKpvfepe5o2VDYDixXGMAYGpvNc7TdKyUUK7y3n0qiJ2AE8IGD5RdYKd2W0cpuOHwAeBZ44j1E75joAXoGl8UCaMGzLiZtMgcVvDlbCmLKfZnJEDc5tVTj0waoqYxTzzbXwCSo8QZLH2Aevt2rj' && auth === 'Bearer ' + token) {
    console.log('hello');
    onMounted(() => {
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

// Custom sorting function for databases
const customSortDatabases = (a, b, property) => {
    const sortOrder = sortingOrders[property];
    const valueA = a[property];
    const valueB = b[property];
    if (valueA === null) return 1;
    if (valueB === null) return -1;
    if (property === 'size' || property === 'cost') { // Include 'cost' here
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }
    if (property === 'paths') {
        return sortOrder === 'asc' ? valueA[0].localeCompare(valueB[0]) : valueB[0].localeCompare(valueA[0]);
    }
    if(property === 'cost')
    return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
};

const sortDatabases = (property) => {
    toggleSortingOrder(property); // Toggle the sorting order first
    databases.value.sort((a, b) => customSortDatabases(a, b, property));
};

const filteredDatabases = computed(() => {
    if (!databaseSearchKeyword.value) {
        return databases.value;
    }
    const keywordTwo = databaseSearchKeyword.value.toLowerCase();
    return databases.value.filter(database => 
        (database.name + database.paths.join('') + calculateCost(database.size)).toLowerCase().includes(keywordTwo)
    );
});

const sortingOrders = {
    VMName: 'asc',
    Status: 'asc',
    IP: 'asc',
    LastCheckInTime: 'asc',
    HyperVisor: 'asc',
    Hostname: 'asc',
    name: 'asc',
    size: 'asc',
    paths: 'asc',
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

.dCost1:hover {
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