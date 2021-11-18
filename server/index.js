const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const formRoutes = require("./routes/signIn.js")

require('dotenv').config();
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('AYYYY, TONY!!')
})

app.use('/form', formRoutes)

app.listen(PORT, console.log(`Server on local host ${PORT}`));