const {config} = require('dotenv')
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
    type: DB_TYPE || "mysql",
    host: DB_HOST || "localhost",
    port: DB_PORT || 3306,
    username: DB_USER || "test",
    password: DB_PASS || "test",
    database: DB_NAME || "test",
    synchronize: true,
    logging: false,
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
