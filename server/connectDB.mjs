import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("Using existing connection.");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("Successfully connected to MongoDB.");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  } 
}

export default connectDB;