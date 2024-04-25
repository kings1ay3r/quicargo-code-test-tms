import DBConnection from '@app/server/repository/dbc'
import apiRouter from '@app/server/router'
import express from 'express'
import request from 'supertest'

DBConnection.connectionString = 'postgres://postgres:password@localhost:5432/test'

const [adminToken, userToken] = ['YWRtaW48', 'YWRtaW46']

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiRouter)

describe('locations', () => {
  let locationUuid: string = 'undefined'
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/locations')
      .set('Authorization', `Basic ${adminToken}`)
      .send({ name: 'test-location123', lattitude: 53.6, longitude: 4.09, address: 'test address' }) // corrected 'latitude' spelling
    expect(res.statusCode).toEqual(200)
    locationUuid = res.body.data.data[0].uid
  })
  test('get /locations', async () => {
    const res = await request(app).get('/api/locations').set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(200)
  })
  test('get /locations/:uid', async () => {
    const res = await request(app)
      .get(`/api/locations/${locationUuid}`)
      .set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(200)
  })
  test('update /locations/:uid', async () => {
    const res = await request(app)
      .patch(`/api/locations/${locationUuid}`)
      .set('Authorization', `Basic ${adminToken}`)
      .send({ name: 'test-location2' })
    expect(res.statusCode).toEqual(200)
    expect(res.body.data.data[0].name).toEqual('test-location2')
  })
  test('delete /locations/:uid unauthorized user', async () => {
    const res = await request(app)
      .delete(`/api/locations/${locationUuid}`)
      .set('Authorization', `Basic ${userToken}`)
    expect(res.statusCode).toEqual(401)
  })
  test('delete /locations/:uid', async () => {
    const res = await request(app)
      .delete(`/api/locations/${locationUuid}`)
      .set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toEqual(true)
  })
  test('post /locations - invalid  data', async () => {
    const res = await request(app)
      .post('/api/locations')
      .set('Authorization', `Basic ${adminToken}`)
      .send({ name: 'test-location', lattitude: 53.6 })
    expect(res.statusCode).toEqual(400)
  })
  test('get /locations/:uid invalid locaton', async () => {
    const res = await request(app)
      .get('/api/locations/undefined')
      .set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(500)
  })
  test('update /locations/:uid invalid location', async () => {
    const res = await request(app)
      .patch('/api/locations/undefined')
      .set('Authorization', `Basic ${adminToken}`)
      .send({ name: 'test-location2' })
    expect(res.statusCode).toEqual(500)
  })
  test('delete /locations/:uid invalid location', async () => {
    const res = await request(app)
      .delete('/api/locations/undefined')
      .set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(500)
  })
})
