import { config } from 'dotenv'

config()

import 'reflect-metadata'

import express from 'express'
import helmet from 'helmet'
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
    // TODO: Add rate limiter
    app.use(helmet())
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
