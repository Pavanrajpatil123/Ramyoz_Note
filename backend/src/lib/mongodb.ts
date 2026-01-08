import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

export default async function dbConnect() {
  if (!global.mongooseConn) {
    global.mongooseConn = { conn: null, promise: null };
  }
  const cached = global.mongooseConn;
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('Please define the MONGODB_URI environment variable');
    cached.promise = mongoose
      .connect(uri, {
        dbName: undefined,
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
