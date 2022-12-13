import { StatusCodes } from "http-status-codes";
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('POST /auth', () => {
  beforeAll( async () => { 
    jest.setTimeout(8000)
    app.locals.db = await mongoose.connect(process.env.MONGODB_URI)
  })
  afterAll( () => {
    mongoose.connection.close(true)
  })
  test('POST /auth Correct Password', () => {
    return request(app).post('/auth')
    .send({email:'alessandro.manfucci@gmail.com', password:'password'})
    .expect(StatusCodes.OK)
    .expect((res) =>{
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('userType');
    })
  })
  test('POST /auth Wrong Password', () => {
    return request(app).post('/auth')
    .send({email:'alessandro.manfucci@gmail.com', password:'wrong password'})
    .expect(StatusCodes.FORBIDDEN)
    .expect((res) =>{
      expect(res.body).toHaveProperty('message');
      expect(res.body).not.toHaveProperty('token');
    })
  })
})