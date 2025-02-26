import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { answerUserMessage } from '../functions/answer-user-message'

export const sendMessageRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/messages',
    {
      schema: {
        summary: 'Send a message to the AI chat',
        tags: ['subscription'],
        body: z.object({
          message: z.string(),

          // validação dos campos
        }),
        // response é a serialização
        response: {
          200: z.object({
            response: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      //request = Os dados da requisição. reply = uma forma de devolver uma resposta customizada.
      const { message } = request.body

      const { response } = await answerUserMessage({
        message,
      })

      return { response: message }
    }
  )
}
