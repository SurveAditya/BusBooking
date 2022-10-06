const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);

const db = mongoose.connection;

db.on("connected",()=>{
        console.log("MongoDb connected successfully");
});

db.on("error",()=>{
    console.log("MongoDb Connection Failed");
});

