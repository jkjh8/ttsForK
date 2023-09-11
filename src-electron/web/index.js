import path from 'path'
import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import httpLogger from 'morgan'

import routes from './routes'
import logger from '/src-electron/logger'

const web = express()
const webPort = 9999

web.use(express.json())
web.use(express.urlencoded({ extended: false }))
web.use(cookieParser())
if (process.env.NODE_ENV === 'development') {
  web.use(httpLogger('dev'))
  web.use(
    cors({
      origin: (origin, callback) => {
        callback(null, origin)
      }
      // credentials: true
    })
  )
}
// routes
web.use('/', routes)

// listen
web.listen(webPort, () => {
  logger.info(`listening API Server on ${webPort}`)
})

export default web
