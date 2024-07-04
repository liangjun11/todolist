const request = require('supertest')
const express = require('express')
const appSetup = require('./appSetup')

const app = express()
appSetup(app)

describe('Login', () => {
  it('should create a new example', async () => {
    const res = await request(app)
      .post('/login')
      .send({ name: 'Test Name' })
      .expect(200)

    expect(res.body.name).toBe('Test Name')
  })
})

// More tests to add...
