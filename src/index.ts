import { SetupServer } from './server'

;(async () => {
  const app = new SetupServer()

  await app.init()
})()
