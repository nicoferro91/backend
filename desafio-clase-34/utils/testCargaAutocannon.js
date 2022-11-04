// Para ver el performance con autocannon y 0x

const autocannon = require("autocannon")
const { PassThrough } = require("stream")

const ejecutar = (url) => {
  const buf = []
  const outputStream = new PassThrough()

  const inst = autocannon({
    url,
    connections: 100, //default
    duration: 20, // default
  })

  autocannon.track(inst, { outputStream })

  outputStream.on("data", (data) => {
    buf.push(data)
  })

  inst.on("done", () => {
    process.stdout.write(Buffer.concat(buf))
  })
}

  ejecutar("http://localhost:8080/infoComprimida")