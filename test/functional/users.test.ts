import { User } from '@src/models/user'

describe('Users Functional Tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('When creating a new user', () => {
    it('should successfully create a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456Ab',
      }

      const response = await global.testRequest.post('/users').send(newUser)
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(newUser))
    })
  })
})
