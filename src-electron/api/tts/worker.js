const { parentPort, workerData } = require('worker_threads')
const { PythonShell } = require('python-shell')

const options = {
  mode: 'json',
  pythonPath: workerData.pythonPath,
  pythonOptions: ['-u'],
  scriptPath: __dirname,
  args: [...workerData.args]
}

PythonShell.run('tts.py', options)
  .then((result) => {
    parentPort.postMessage(result[0])
    parentPort.close()
  })
  .catch((err) => {
    parentPort.emit('error', err)
    parentPort.close()
  })
