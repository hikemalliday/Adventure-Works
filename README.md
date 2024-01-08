# Adventure-Works
##### A mock e-commerce website created with VueJS and Vuex (a global store library)

### Local Installation:
I have added a 'docker-compose' folder, which contains a docker-compose.yaml. Run this YAML to pull both the backend and frontend images from Docker Hub and launch the website locally.

###### Docker Hub:
https://hub.docker.com/r/hikemalliday/adventure-works-frontend

The Adventure Works database is a mock database created by Microsoft, for learning purposes. It is normalized, and considered well architectured. 
The website has login / signup using JWT's. Each user has their own shopping cart, which is stored in localStorage. 
Query products by search string (input bar), or select categories.

![](https://cdn.discordapp.com/attachments/1180635913022353499/1193955468444438600/image.png?ex=65ae98ae&is=659c23ae&hm=39ab07cb9ed0c7062989c2f7a71535842eebc163073eba7750795b1624e035b4&)

# Dev Notes

This is the first Vue project I have done using a global store library (Vuex), as opposed to the traditional (or built-in) method of passing data from parent to child component, and vice-versa. I oringially had the Adventure Works database running locally on a MSSQL server, but in order to display the project on a website, I extracted the needed data from it, and created a lite version of the database using SQLite.
