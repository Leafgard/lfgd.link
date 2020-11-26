import config from './config/app.config'
import { runSentry } from './providers/SentryProvider'

import { app } from './index'

import { createConnection } from 'typeorm'

const ormconfig = require('../ormconfig.js')

createConnection(ormconfig)
    .then(() => {
        // Run Sentry if wanted
        config.SENTRY_DSN && runSentry()

        app.listen(config.APP_PORT, () => console.log(`leaf.link is listening on port ${ config.APP_PORT }`))
    })
    .catch(console.error)