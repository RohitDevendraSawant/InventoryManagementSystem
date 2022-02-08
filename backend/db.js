const mongoose = require("mongoose");
const username = "Project";
const password = "Project";
const cluster = "cluster0.gzja0";
const dbName = "inventoryManagementSystem";
const mongoURI = `mongodb+srv://Project:Project@cluster0.gzja0.mongodb.net/inventoryManagementSystem?retryWrites=true&w=majority`;

const connectToMongo = () => {
  mongoose.connect(mongoURI, 
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
    console.log("Connected")
  );
};

module.exports = connectToMongo;
