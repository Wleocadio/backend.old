const express = require("express")
const cors = require("cors")
const app = express()
const fs = require('fs');
const path = require('path');
require('dotenv/config');

app.use(cors())

app.use(express.json())

//DB Connection
const conn = require("./db/conn")

conn();

// Routes

const routes = require("./routes/router")

app.use("/api", routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(3000, function () {
    console.log("Servidor Online!")
})

