import path from 'path'
import os from 'os'
import { Worker } from 'worker_threads'

const platform = process.platform || os.platform()

let ttsInfo

let pythonPath = path.resolve(
  process.env.NODE_ENV === 'production' ? process.resourcesPath : '',
  'venv',
  platform === 'win32' ? 'Scripts' : 'bin',
  'python'
)

function ttsGet(args) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
      workerData: { pythonPath, args: args }
    })
    worker.on('message', (message) => {
      ttsInfo = message
      resolve(message)
    })
    worker.on('exit', () => {
      resolve()
    })
    worker.on('error', (err) => {
      reject(err)
    })
  })
}

export { ttsInfo, ttsGet }
