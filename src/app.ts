import { config } from 'dotenv'

config()

import 'reflect-metadata'

import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import bodyParser from 'body-parser'

/**
 * Routes
 */
import urlRoutes from './routes/urlRoutes'
import { createConnection } from 'typeorm'

createConnection()
  .then(() => {
    const app = express()
    const port = process.env.PORT || 8080

    /**
     * Application configuration
     */
    app.use(helmet())
    app.use(rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 25, // Limit each IP to 25 requests per windowMs
      handler: (req, res) => {
        res.status(429).json({
          error: 'Too many requests, please try again later.'
        })
      }
    }))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(compression())

    app.use(express.static('client/build'))

    app.use(urlRoutes)

    app.listen(port, () => console.log(`leaf.link is listening on port ${ port }`))
  })
  .catch(console.error)
