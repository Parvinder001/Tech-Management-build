const mongoose = require("mongoose");

const URI = process.env.MONGODB_URL;

const ConnectionDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Successfully Connected With DataBase");
  } catch (error) {
    console.error("Database Connection Is FIeld!", error.message);
    process.exit(0);
  }
};

module.exports = ConnectionDB;
