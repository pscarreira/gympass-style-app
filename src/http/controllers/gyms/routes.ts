import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { nearby } from './nearby.controller'
import { search } from './search.controller'

export async function gymRoutes (app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', create)
  app.get('/gyms/nearby', nearby)
  app.get('/gyms/search', search)
}
