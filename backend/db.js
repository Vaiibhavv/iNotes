const mongoose = require("mongoose");
require('dotenv').config();

//const DATABASE= process.env.DATABASE;

 //const mongoURI="mongodb://127.0.0.1:27017/iNotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1"
  //const mongoURI= `${DATABASE}`
  //added database
  const mongoURI= "mongodb+srv://vaibhu3597:Y0z3o6BKWOlvDFFX@cluster1.jcnk9vr.mongodb.net/notesdata?retryWrites=true&w=majority"
const connectToMongo = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
};
module.exports = connectToMongo;


