const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/guitarhaven", {
        serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    })
    .then(() => {
        console.log("Connected to MongoDB successfully!");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });