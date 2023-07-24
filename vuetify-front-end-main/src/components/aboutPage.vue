<template>
    <p>Core functionality: Gathers server and database information from various hosts, compiles them, and displays them on a webpage.</p>
    <p> </p>
    <p>Backend: Gathers data from a series of automated Powershell scripts that collect the data and send it to a set host in a json file. The host runs a series of programs that compile each set of data into separate lists, checking for outdated information and deleting it. The backend then utilizes the get and post APIs in order to store and transmit the data to the frontend. </p>

    <p>Authentication: Something with tokens and stuff. Requires a valid username and password  to ensure information is only accessed by the intended users. </p>

    <p>Frontend: Utilizes the fetch API to retrieve the data from the set host. The data is then displayed in a series of tables. The tables can be filtered with search functionality. </p>

    <p>Distribution: The code is all compiled and stored in a container that is hosted on a virtual server so the programs can run constantly and be accessed as needed.</p>


    <img id = "flowchart" src="https://i.ibb.co/wrFLqF8/Microsoft-Teams-image.png">


    <img id = "groupPhoto" src="https://i.ibb.co/3CjkpCY/Intern-Group-Photo-Good.jpg">
    <p>2023 IT Asset Project</p>
    <p>Designed by La Salle College High School class of 2024 summer interns</p>
    <p>Members: Ethan Pakuris, Jared Werts, Ian Whitaker, Evan Comiciotto, Fahd Khan, Steve Trezza</p>
    <p>(From left to right as pictured)</p>
    <!--ABOUT PAGE CAN BE BUILT HERE
        OR DESIGNED IN ANOTHER COMPONENT AND IMPORTED-->
</template>

<style scoped>
#groupPhoto{
    width: 20rem;
    height: auto;
}
#flowchart{
    width: 20rem;
    height: auto;
}
</style>
