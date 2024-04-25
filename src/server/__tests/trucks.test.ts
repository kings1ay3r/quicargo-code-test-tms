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

describe('trucks', () => {
  let truckUid: string = 'undefined'
  let locationUuid: string = 'undefined'
  beforeAll(async () => {
    const location = await request(app)
      .post('/api/locations')
      .set('Authorization', `Basic ${adminToken}`)
      .send({ name: 'test-location123', lattitude: 53.6, longitude: 4.09, address: 'test-address' }) // corrected 'latitude' spelling

    locationUuid = location.body.data.data[0].uid
    const res = await request(app)
      .post('/api/trucks')
      .set('Authorization', `Basic ${adminToken}`)
      .send({
        name: 'Rowan Larson',
        licensePlate: 'Y-JKT-3',
        make: 'Make 1',
        model: 'Model 1',
        year: 2022,
        capacity: 6849,
        locationUuid: locationUuid,
        brand: 'brand 1',
      })
    expect(res.statusCode).toEqual(200)
    truckUid = res.body.data.data[0].uid
  })
  afterAll(async () => {
    await request(app)
      .delete(`/api/locations/${locationUuid}`)
      .set('Authorization', `Basic ${adminToken}`)
  })
  test('get /trucks', async () => {
    const res = await request(app).get('/api/trucks').set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(200)
  })
  test('get /trucks/:uid', async () => {
    const res = await request(app)
      .get(`/api/trucks/${truckUid}`)
      .set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(200)
  })
  test('update /trucks/:uid', async () => {
    const res = await request(app)
      .patch(`/api/trucks/${truckUid}`)
      .set('Authorization', `Basic ${adminToken}`)
      .send({ name: 'test-truck2' })
    expect(res.statusCode).toEqual(200)
    expect(res.body.data.data[0].name).toEqual('test-truck2')
  })
  test('delete /trucks/:uid unauthorized user', async () => {
    const res = await request(app)
      .delete(`/api/trucks/${truckUid}`)
      .set('Authorization', `Basic ${userToken}`)
    expect(res.statusCode).toEqual(401)
  })
  test('delete /trucks/:uid', async () => {
    const res = await request(app)
      .delete(`/api/trucks/${truckUid}`)
      .set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toEqual(true)
  })
  test('post /trucks - invalid  data', async () => {
    const res = await request(app)
      .post('/api/trucks')
      .set('Authorization', `Basic ${adminToken}`)
      .send({ name: 'test-truck', lattitude: 53.6 })
    expect(res.statusCode).toEqual(400)
  })
  test('get /trucks/:uid invalid locaton', async () => {
    const res = await request(app)
      .get('/api/trucks/undefined')
      .set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(500)
  })
  test('update /trucks/:uid invalid truck', async () => {
    const res = await request(app)
      .patch('/api/trucks/undefined')
      .set('Authorization', `Basic ${adminToken}`)
      .send({ name: 'test-truck2' })
    expect(res.statusCode).toEqual(500)
  })
  test('delete /trucks/:uid invalid truck', async () => {
    const res = await request(app)
      .delete('/api/trucks/undefined')
      .set('Authorization', `Basic ${adminToken}`)
    expect(res.statusCode).toEqual(500)
  })
})
