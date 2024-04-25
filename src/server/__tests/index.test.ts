import request from 'supertest'
import express from 'express'
import apiRouter from '@app/server/router'
import DBConnection from '@app/server/repository/dbc'

DBConnection.connectionString = 'postgres://postgres:password@localhost:5432/test'

const [adminToken, userToken] = ['YWRtaW48', 'YWRtaW46']

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiRouter)

describe('api endpoints', () => {
  test('test ping', async () => {
    const res = await request(app).get('/api/ping')
    expect(res.statusCode).toEqual(200)
  })
})
