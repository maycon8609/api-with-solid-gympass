import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Gyms: Search Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'create-mock-gym-01',
        description: 'Some description',
        phone: '11999999999',
        latitude: -5.060131,
        longitude: -42.8335233,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'create-mock-gym-02',
        description: 'Some description',
        phone: '11999999999',
        latitude: -5.060131,
        longitude: -42.8335233,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'mock-gym-02',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'create-mock-gym-02',
      }),
    ])
  })
})
