import { Router } from 'express'
import { validate } from 'class-validator'
import { Url } from '../entity/Url'
import { getRepository } from 'typeorm'

const router = Router()

router.post('/', async (req, res) => {
  const body = req.body as Url

  const link = new Url()
  link.url = body.url
  link.slug = body.slug
  link.createdAt = new Date()

  validate(link)
    .then(async (errors) => {
      if (!errors.length) {
        const UrlRepository = getRepository(Url)
        try {
          await UrlRepository.findOne(link)
          const insertedLink = await UrlRepository.save(link)
          res.json({
            message: 'Link successfully created. 🔗',
            link: {
              url: 'lfgd.link',
              slug: insertedLink.slug
            }
          })
        } catch (e) {
          res.status(403).json({ error: 'Slug in use. 🐌' })
        }
      } else {
        res.status(400).json({ error: errors })
      }
    })
})

router.get('/:slug', async (req, res) => {
  try {
    const UrlRepository = getRepository(Url)
    const link = await UrlRepository.findOneOrFail({ slug: req.params.slug })
    res.redirect(link.url)
  } catch (e) {
    res.status(404).json({ error: 'No such slug. ❓' })
  }
})

export default router
