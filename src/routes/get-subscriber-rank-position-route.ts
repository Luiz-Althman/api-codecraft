import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getSubscriberRankPostion } from '../functions/get-subscriber-ranking-position'

export const getSubscriberRankPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscriber ranking position',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
            // validação dos campos
          }),
          // response é a serialização
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        //request = Os dados da requisição. reply = uma forma de devolver uma resposta customizada.
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankPostion({ subscriberId })

        return { position }
      }
    )
  }
