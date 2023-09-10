import path from 'path'
import os from 'os'
import { Worker } from 'worker_threads'

import makeId from '../makeId'
import { mediaFolder } from '../folder'

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
    let command = { ...args }
    if (command.comm === 'make_file') {
      command['filename'] = path.join(
        mediaFolder ? mediaFolder : __dirname,
        `${makeId(12)}.wav`
      )
    }
    // start python shell
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
      workerData: { pythonPath, args: command }
    })
    worker.on('message', (message) => {
      if (args.comm === 'get_info') {
        ttsInfo = message
      }
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
