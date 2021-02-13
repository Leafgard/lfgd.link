import * as koaCompress from 'koa-compress'

const webConfig = {
    APP_PORT: process.env.APP_PORT ?? 3000,
    APP_NAME: process.env.APP_NAME ?? 'LFGD.LINK',
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
    SENTRY_DSN: process.env.SENTRY_DSN || ''
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

export default appConfig
