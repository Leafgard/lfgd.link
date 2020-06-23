const {config} = require('dotenv')
config()

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    type: process.env.DB_TYPE || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || "test",
    password: process.env.DB_PASS || "test",
    database: process.env.DB_NAME || "test",
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
