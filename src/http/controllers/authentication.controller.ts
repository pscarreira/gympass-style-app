import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credential-error'
import { makeAuthenticationUseCase } from '@/use-cases/factories/make-authentication-use-case'

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticationUseCase = makeAuthenticationUseCase()
    const { user } = await authenticationUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        }
      })
    return reply.status(200).send({
      token
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message
      })
    }
    throw err
  }
}
