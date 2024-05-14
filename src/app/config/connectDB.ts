import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function connectDB() {
  const env: any = process.env;
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(env.MONGO_URL);
  connection.isConnected = db.connections[0].readyState;
}

export default connectDB;
