# Adventure-Works
##### A mock e-commerce website

The Adventure Works database is a mock database created by Microsoft, for learning purposes. It is normalized, and considered well architectured. 
The website has login / signup using JWT's. Each user has their own shopping cart, which is stored in localStorage. 
Query products by search string (input bar), or select categories.

# Dev Notes

I oringially had the Adventure Works database running locally on a MSSQL server, but in order to display the project on a website, I extracted the needed data from it, and created a lite version of the database using SQLite.
