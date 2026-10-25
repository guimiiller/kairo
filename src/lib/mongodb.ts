import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI não configurada.");
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseConnection?: Promise<typeof mongoose>;
};

export async function connectMongoDB() {
  if (!globalForMongoose.mongooseConnection) {
    globalForMongoose.mongooseConnection = mongoose
      .connect(MONGODB_URI as string)
      .catch((error) => {
        globalForMongoose.mongooseConnection = undefined;
        throw error;
      });
  }

  return globalForMongoose.mongooseConnection;
}
