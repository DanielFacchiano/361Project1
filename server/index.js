// basic node express app layouts and depenancies
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const formRoutes = require("./routes/signIn.js")
require('dotenv').config();
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());


// test our server is running with unused get request
app.get('/', (req, res) => {
    res.send('AYYYY, TONY!!')
})

// Form route how formRoutes subroutes
app.use('/form', formRoutes)

//Our server listens on this port
app.listen(PORT, console.log(`Server on local host ${PORT}`));