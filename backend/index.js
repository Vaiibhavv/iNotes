const connectToMongo= require("./db");
connectToMongo();
var cors = require('cors')
const express = require('express')
require('dotenv').config();
const app = express()
const PORT =process.env.PORT || 5000;
const BASE_URL= process.env.BASE_URL;
app.use(cors())
app.use(express.json())

app.use('/api/auth',require("./routes/auth"))
app.use('/api/notes',require("./routes/notes"))

app.listen(PORT, () => {
  console.log(`Example app listening at ${BASE_URL}:${PORT}`)
})


