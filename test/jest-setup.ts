import { SetupServer } from '@src/server'
import supertest, { SuperTest, Test } from 'supertest'

let server: SetupServer
beforeAll(() => {
  server = new SetupServer()
  server.init()
  global.testRequest = supertest(server.getApp()) as unknown as SuperTest<Test>
})

afterAll(async () => await server.close())
