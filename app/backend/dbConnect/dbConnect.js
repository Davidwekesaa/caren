import { mongoose } from "mongoose";

global.Mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (global?.Mongoose && global?.Mongoose?.conn) {
    console.log("connected from previouse");
    return global.Mongoose.conn;
  } else {
    const conString = process.env.NEXT_PUBLIC_MONGO;
    const connection = mongoose.connect(conString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    global.Mongoose = {
      conn: await connection,
      promise: await connection,
    };

    console.log("new connection");

    return await connection;
  }
}
