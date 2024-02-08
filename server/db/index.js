const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBUrl = process.env.MONGODBURL;

mongoose.set('strictQuery', false);

mongoose
    .connect(mongoDBUrl)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((e) => console.log(e));