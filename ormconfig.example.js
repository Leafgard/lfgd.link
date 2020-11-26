const { config } = require('dotenv')
config()

const {
    NODE_ENV,
    DB_TYPE,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_NAME
} = process.env

const isProd = NODE_ENV === 'production'

module.exports = {
    useUnifiedTopology: true,
    type: DB_TYPE || "mongodb",
    host: DB_HOST || "mongo",
    port: DB_PORT || 27017,
    username: DB_USER || "test",
    password: DB_PASS || "test",
    database: DB_NAME || "test",
    synchronize: true,
    logging: true,
    entities: [
        `${isProd ? 'dist' : 'src'}/entity/**/*.${isProd ? 'js' : 'ts'}`
    ],
    migrations: [
        `${isProd ? 'dist' : 'src'}/migration/**/*.${isProd ? 'js' : 'ts'}`
    ],
    subscribers: [
        `${isProd ? 'dist' : 'src'}/subscriber/**/*.${isProd ? 'js' : 'ts'}`
    ]
}
