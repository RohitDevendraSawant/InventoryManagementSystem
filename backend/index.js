const connectToMongo = require('./db');
const express = require('express')
const mongoose = require("mongoose");


connectToMongo();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express()
const port = 5000;

app.use(express.json())

//Available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/items',require('./routes/items'));

app.get('/',(req,res)=>{
  res.send("Hello");
})

app.listen(port, () => {
  console.log(`Inventory app listening at http://localhost:${port}`)
})
