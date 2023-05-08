import mongoose from "mongoose";

let isConnected = false;
const mongodb_uri = process.env.MONGODB_URI || "";

interface databaseOptions {
  dbName: string;
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const databaseOptions: databaseOptions = {
  dbName: "share_prompt",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(mongodb_uri, databaseOptions);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
