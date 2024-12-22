const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect("mongodb+srv://pankajgiri6585:iG6IJXCCZKcvDRjt@cluster1.k3snr.mongodb.net/Shopping1");
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDb;