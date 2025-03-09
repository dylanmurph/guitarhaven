# SD2b - Full Stack Development CA2    
  
## Instructions:  
  
You must have a MongoDB database: **guitarhaven**    
Import collections: **guitars**, **users**, **purchases** which are saved in the root folder.  
  
From the root directory:    
```bash  
npm run start:all  
```  
(This is a quick script to `npm start` in both the client and server concurrently, as `npm run dev` wouldn't work when we set this up originally)  
  
## Store Overview:  
This is a simple store which sells guitars. You can view the store from the navbar button, the home page explore button, or alternatively click the links to take you straight to a selected category.  
  
You can register an account or login to your account. We use **JWT** to ensure the user session is saved.    
The cart is stored in the user's own database object, so they can pick up where they left off.  
  
Admins can only be created from within the database itself. Once given `accessLevel: 2`, they will have an **admin tools menu** in their account dropdown, which allows them to view all users, guitars, purchases, and returns.  
  
Users can view their own purchase history from the account dropdown, edit their own account details, or simply log out.  
  
There is a **search and sort feature** for all tables and store pages where the user can filter, search, and sort for what they are looking for.  
  
## @Authors:  
- [Dylan Murphy - D00223094](https://github.com/dylanmurph)  
- [Matthew Tomkins - D00272125](https://github.com/mattjt)
