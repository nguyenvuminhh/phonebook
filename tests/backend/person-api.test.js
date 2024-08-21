const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const Contact = require('../../modules/contact')

const { test, beforeEach, after } = require('node:test')
const { mongoose } = require('mongoose')
const assert = require('assert')

beforeEach(async () => {
  await Contact.deleteMany({})
})

test('should be able to add unique contact with proper format', async () => {
  const newInfo = { name: 'hiiiiiii', number: '111-222-3333' }
  const errorInfo1 = { name: 'hi', number: '111-222-3333' }
  const errorInfo2 = { name: 'hi', number: '111-22-3333' }
  await api.post('/api/persons').send(errorInfo1).expect(400)
  await api.post('/api/persons').send(errorInfo2).expect(400)
  await api.post('/api/persons').send(newInfo).expect(201)
  await api.post('/api/persons').send(newInfo).expect(400)
  assert.strictEqual((await Contact.find({})).length, 1)
})

after(() => {
  mongoose.connection.close()
})