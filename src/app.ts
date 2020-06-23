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
      max: 100 // Limit each IP to 100 requests per windowMs
    }))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(compression())

    app.get('/', async (req, res) => {
      res.json({ message: 'Welcome on leaf.link url shortener' })
    })

    app.use(urlRoutes)

    app.listen(port, () => console.log(`leaf.link is listening on port ${ port }`))
  })
  .catch(console.error)
