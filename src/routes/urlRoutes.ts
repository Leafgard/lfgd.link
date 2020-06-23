import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  res.json({ message: 'Welcome on leaf.link url shortener' })
})

export default router
