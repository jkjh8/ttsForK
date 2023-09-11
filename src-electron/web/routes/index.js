import express from 'express'

const router = express.Router()

router.use('/', (req, res) => {
  res.status(200).send('TTS API Service')
})
export default router
