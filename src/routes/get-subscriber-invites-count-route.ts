import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscriber invites count',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
            // validação dos campos
          }),
          // response é a serialização
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        //request = Os dados da requisição. reply = uma forma de devolver uma resposta customizada.
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesCount({ subscriberId })

        return { count }
      }
    )
  }
