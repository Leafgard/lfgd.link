import { Router } from 'express'
import { validateOrReject } from 'class-validator'
import { getRepository } from 'typeorm'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import { Url } from '../entity/Url'

const router = Router()

const slugifyOptions = {
  replacement: '-',
  remove: /[*+~.()'"!:@/]/g,
  strict: false
}

router.post('/', async (req, res) => {
  const body = req.body as Url

  const link = new Url()
  link.url = body.url
  link.slug = (
    slugify(body.slug, slugifyOptions) || nanoid(6)
  ).toLowerCase()
  link.createdAt = new Date()

  validateOrReject(link)
    .then(async () => {
      const UrlRepository = getRepository(Url)
      try {
        await UrlRepository.findOne(link)
        const { slug } = await UrlRepository.save(link)
        res.json({
          message: 'Link successfully created. 🔗',
          link: {
            url: 'lfgd.link',
            slug
          }
        })
      } catch (e) {
        res.status(403).json({ error: 'Slug in use. 🐌' })
      }
    })
    .catch((errors) => {
      res.status(400).json({ error: errors })
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
