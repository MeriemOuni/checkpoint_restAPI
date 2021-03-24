// 1 require express 
const express = require('express');

// 2 require mongoose
const app = express();

// 5 require dotenv & configure
require('dotenv').config();

// 8 Middlewar bodyparser
app.use(express.json()) 

// 6 connect DB
const connectDB = require('./config/connectDB')
connectDB();

// 7 routes
const router = require('./routes/contact')
app.use('/api/contacts', router);

// 3 port
const PORT = process.env.PORT

// create server
app.listen(PORT , error => {
    error ? console.error(`Failed to connect to server !!! ${error}`)
        :
        console.log(`Server is running on port ${PORT} ...`)
});