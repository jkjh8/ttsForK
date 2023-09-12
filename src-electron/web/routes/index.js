import express from 'express'
import fs from 'fs'
const { LocalFileData } = require('get-file-object-from-local-path')
import path from 'path'
import tts from './tts'
import { socket } from '/src-electron/api/server'

const router = express.Router()

router.use('/tts', tts)
router.get('/dw', (req, res) => {
  const file = new LocalFileData('C:/Users/jkjh8/Downloads/Anydesk.exe')
  console.log(file)
  socket.emit(
    'upload',
    {
      name: file.name,
      type: file.type,
      data: fs.readFileSync('C:/Users/jkjh8/Downloads/Anydesk.exe')
    },
    (status) => {
      console.log(status)
    }
  )
  res.status(200).json({ result: 'OK' })
})

router.use('/', (req, res) => {
  res.status(200).send('TTS API Service')
})

export default router
