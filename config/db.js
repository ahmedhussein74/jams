const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Connected to database: ${connection.name}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
