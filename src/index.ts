import 'reflect-metadata'

import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import serve from 'koa-static'

import config from './config/app.config'

import LinkController from './controllers/LinkController'

const app = new Koa()

app.use(serve('client/build', {
    defer: false
}))

app
    .use(helmet())
    //.use(rTracer.koaMiddleware())
    .use(json())
    .use(bodyParser())
    .use(compress(config.COMPRESS_OPTIONS))

app.use(LinkController.routes()).use(LinkController.allowedMethods())

export {
    app
}