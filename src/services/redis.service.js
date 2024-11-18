import { createClient } from "redis";

let redisClient;
let redisConfig;

/**
 * @author PRAVIN DASARI
 * @description connect with redis server
 * @param {Object} config It contains host and port of redis server to connect with redis
 * @returns {Promise<Object>} It return the redis server instance
 */
export async function connectRedis(config) {
  return new Promise(function (resolve, reject) {
    try {
      redisConfig = config;
      if (redisClient) return resolve(redisClient);
      redisClient = createClient({ ...config });
      redisClient.on("error", (err) => {
        console.log(`service - redis - connectRedis - error - ${err}`);
      });
      redisClient.on("connect", (err) => {
        console.log(`service - redis - connectRedis - redis connection made`);
        resolve(redisClient);
      });
      redisClient.connect();
    } catch (err) {
      console.error(`service - redis - connectRedis - exception - ${err}`);
      reject(err);
    }
  });
}

/**
 * @author PRAVIN DASARI
 * @description Set the data in redis
 * @param {string} key It is key where data is store
 * @param {Object} data task object which we want to store in redis on key
 */
export async function set(key, data) {
  try {
    console.log(
      `service - redis - set - key ${key} -  data - ${JSON.stringify(data)}`
    );
    if (!redisClient) await connectRedis(redisConfig);
    await redisClient.set(`${key}`, JSON.stringify(data));
    console.log(`service - redis - set - data saved on ${key} key`);
  } catch (err) {
    console.error(`service - redis - set - exception - ${err}`);
  }
}

/**
 * @author PRAVIN DASARI
 * @description get data from redis by key
 * @param {string} key It is key to get data from redis
 * @returns {Object | undefined} It return task object which store on same key if data exist else undefined
 */
export async function get(key) {
  try {
    console.log(`service - redis - get - key ${key}`);
    if (!redisClient) await connectRedis(redisConfig);
    let data = await redisClient.get(`${key}`);
    console.log(`service - redis - get - key ${key} - data - ${data} `);
    return JSON.parse(data);
  } catch (err) {
    console.error(`service - redis - get - exception - ${err}`);
  }
}

/**
 * @author PRAVIN DASARI
 * @description delete data from specific key of redis
 * @param {key} key It is key to delete data from redis
 *
 */
export async function del(key) {
  try {
    console.log(`service - redis - del - key ${key}`);
    if (!redisClient) await connectRedis(redisConfig);
    await redisClient.del(`${key}`);
  } catch (err) {
    console.error(`service - redis - del - exception - ${err}`);
  }
}

/**
 *
 * @description To get all keys which is match with specified pattern
 * @param {string} pattern string pattern to get matched keys
 * @returns {Array<string> | undefined} It return array of matched keys if keys found in redis else undefined
 */
export async function getKeys(pattern) {
  try {
    if (!redisClient) await connectRedis(redisConfig);
    const keys = await redisClient.keys(pattern);
    console.log(`service - redis - getKeys - ${JSON.stringify(keys)} -  `);
    return keys;
  } catch (err) {
    console.error(`service - redis - getKeys - exception - ${err}`);
  }
}
