const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://rathipreet28:Preet2525@cluster0.r3ujkn9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => { 
  await Listing.deleteMany({});
 initData.data =  initData.data.map((obj)=>({...obj , owner :"68492fab42b6344a7455ca94" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();