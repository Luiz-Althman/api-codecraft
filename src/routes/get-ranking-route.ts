import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getRanking } from '../functions/get-ranking'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        tags: ['referral'],

        // response é a serialização
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      //request = Os dados da requisição. reply = uma forma de devolver uma resposta customizada.

      const { rankingWithScore } = await getRanking()

      return { ranking: rankingWithScore }
    }
  )
}
