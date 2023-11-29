# ADVENTURE WORKS website
### A mock ecommerce website based on the Microsoft 'Adventure Works' database. Created with VueJS

This is the frontend for a mock E-Commerce site, which uses the Adventure Works database, a mock SQL database created by Microsoft. Adventure Works is a mock bicycle company. 

The backend is located here: [Adventure-Works-Backend](https://github.com/hikemalliday/Adventure-Works-Backend)

The app allows a user to create a username and password, which is then excrypted and saved into a SQLite database. Upon login, a JWT is issued, and stored in localStorage. The token expires after 30 minutes, and boots the user to login, and the locally stored token is erased. Token is also erased when the user manually logs out. 

The user can query for items in the Adventure works database by searchbar, and filter by categories. Items can be added to a shopping cart. This shopping cart is stored in local storage, and is unique for each user.


