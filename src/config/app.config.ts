import { config } from 'dotenv'
import * as koaCompress from 'koa-compress'

config()

const webConfig = {
    APP_PORT: process.env.APP_PORT || 3000,
    APP_NAME: process.env.APP_NAME || 'LFGD.LINK',
    COMPRESS_OPTIONS: {
        filter (contentType) {
            return /text/i.test(contentType)
        },
        threshold: 2048,
        gzip: {
            flush: require('zlib').constants.Z_SYNC_FLUSH
        },
        deflate: {
            flush: require('zlib').constants.Z_SYNC_FLUSH
        },
        br: false
    } as koaCompress.CompressOptions
}

const monitoringConfig = {
    SENTRY_DSN: process.env.SENTRY_DSN || 'UNKNOWN'
}

const appConfig = {
    SLUFIGY_OPTIONS: {
        replacement: '-',
        remove: /[*+~.()'"!:@/]/g,
        strict: false
    },
    ...webConfig,
    ...monitoringConfig
}

/**
 * Checks for missing required environment variables
 */
const missingEnv = []
Object.keys(appConfig).forEach(key => appConfig[key] === 'UNKNOWN' && missingEnv.push(key))
if (missingEnv.length) throw new Error(`Following ENVs are not defined: ${missingEnv.join(', ')}`)

export default appConfig