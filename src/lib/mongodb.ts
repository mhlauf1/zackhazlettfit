import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

function getMongoDbUri(): string {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }
  return MONGODB_URI;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // Allow global `mongoose` object to have the `MongooseCache` type
  var mongoose: MongooseCache;
}

// Initialize the global `mongoose` variable if it doesn't exist
global.mongoose = global.mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  const uri = getMongoDbUri();

  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(uri).then((mongoose) => {
      return mongoose;
    });
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default connectToDatabase;
