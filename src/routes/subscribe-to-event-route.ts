import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
    app.post(
        '/subscriptions',
        {
            schema: {
                summary: 'Subscribes someone to the event',
                tags: ['subscription'],
                body: z.object({
                    name: z.string(),
                    email: z.string().email(),
                    // validação dos campos
                }),
                // response é a serialização
                response: {
                    201: z.object({
                        name: z.string(),
                        email: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            //request = Os dados da requisição. reply = uma forma de devolver uma resposta customizada.
            const { name, email } = request.body;

            return reply.status(201).send({
                name,
                email,
            });
        }
    );
};
