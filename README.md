# IT Asset Status Page
ExpressJS Backend API with a VueJS front end. Powershell scripts to collect system info and POST it.

#Backend
Gathers data from a series of automated Powershell scripts that collect the data and send it to a set host in json format. The host runs a series of programs that compile each set of data into separate lists, checking for outdated information and deleting it. The backend then utilizes the get and post APIs in order to store and transmit the data to the frontend.	

#Frontend
Utilizes Vue3 and fetch APIs to retrieve the data from the set host. The data is then displayed in a series of table which can be filtered through the collapsable sidebar and searched as desired.

#Authentication
Something with tokens and stuff. Requires a valid username and password to ensure information is only accessed by the intended users.	

#Distribution
The code is all compiled in Docker containers that are hosted and stored on a virtual server in Azure to ensure the programs can run constantly and be accessed as needed.
