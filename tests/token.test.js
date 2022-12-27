const StatusCodes = require('http-status-codes').StatusCodes
const request = require('supertest')
const app = require('../app')
const setup = require('./database/setup')


jest.setTimeout(30000)
beforeAll(async () => await setup())

describe('POST /auth', () => {
  test('POST /auth Correct Password', () => {
    return request(app).post('/auth')
    .send({email:'mario.rossi@gmail.com', password:'password'})
    .expect(StatusCodes.OK)
    .expect((res) =>{
      expect(res.body).toHaveProperty('token')
      expect(res.body?.email).toBe('mario.rossi@gmail.com')
      expect(res.body?._id).toBe('639f1c3274aef65fb510cb79')
      expect(res.body?.ruolo).toBe('cliente')
    })
  })
  test('POST /auth Wrong Password', () => {
    return request(app).post('/auth')
    .send({email:'mario.rossi@gmail.com', password:'wrong password'})
    .expect(StatusCodes.FORBIDDEN)
    .expect((res) =>{
      expect(res.body).not.toHaveProperty('token')
      expect(res.body?.code).toBe(1)
      expect(res.body?.message).toBe('Wrong password')
    })
  })
  test('POST /auth Utente not found', () => {
    return request(app).post('/auth')
    .send({email:'giovanni.rossi@gmail.com', password:'password'})
    .expect(StatusCodes.NOT_FOUND)
    .expect((res) =>{
      expect(res.body).not.toHaveProperty('token')
      expect(res.body?.code).toBe(0)
      expect(res.body?.message).toBe('Utente not found')
    })
  })
})