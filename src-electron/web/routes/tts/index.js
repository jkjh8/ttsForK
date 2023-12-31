import express from 'express'
import { ttsGet } from '/src-electron/api/tts'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const r = await ttsGet({ comm: 'get_info' })
    res.status(200).json(r)
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default router
