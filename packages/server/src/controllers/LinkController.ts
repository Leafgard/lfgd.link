import Router from 'koa-router'

import * as LinkService from '../services/LinkService'

const router = new Router()

/**
 * @method POST
 * @description Create a shortened url
 */
router.post('/', async (ctx, next) => {
  ctx.body = await LinkService.createLink(ctx.request.body)
  await next()
})

/**
 * @method GET
 * @description Redirects to shortened url
 */
router.get('/:slug', async (ctx, next) => {
  const { link } = await LinkService.getLink(ctx.params)
  ctx.redirect(link.url)
  await next()
})

export default router