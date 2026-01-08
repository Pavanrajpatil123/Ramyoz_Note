import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set. Set it in your .env.local file.');
}

export default async function dbConnect() {
  if (!global.mongooseConn) {
    global.mongooseConn = { conn: null, promise: null };
  }
  const cached = global.mongooseConn;
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable');
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: undefined,
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
