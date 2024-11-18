// import 'dotenv/config'

export const dbConfig = Object.freeze({
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    dbName: process.env.DB_NAME || 'test'
})
