import mongoose from "mongoose";

/**
 * @author PRAVIN DASARI
 * @description connect with database
 * @param {Object} config config object which contains connection details
 * @returns {undefined | object} It will return error object if connection failed else undefined
 */
export async function connectDB(config) {
  try {
    await mongoose.connect(
      `mongodb://${config.host}:${config.port}/${config.dbName}`
    );
    console.log(`db - db - connection - mongodb connection success`);
  } catch (err) {
    console.error(`db - db connection - error - ${err}`);
  }
}