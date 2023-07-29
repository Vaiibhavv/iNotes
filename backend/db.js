const mongoose = require("mongoose");

const mongoURI="mongodb://127.0.0.1:27017/iNotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1"
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

