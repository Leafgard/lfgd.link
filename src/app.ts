import { config } from 'dotenv'
config()

import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'

/**
 * Routes
 */
import urlRoutes from './routes/urlRoutes'

const app = express()

/**
 * Application configuration
 */
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression())

app.use(urlRoutes)

export default app
