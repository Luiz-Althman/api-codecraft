import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import {
    validatorCompiler,
    serializerCompiler,
    type ZodTypeProvider,
    jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';
import { env } from './env';

// validatorCompiler força que os dados que estão vindo na rota, seguem um formato especifico (name, email, cellphone)

// serializerCompiler (serialização) é uma forma que temos de transformar os dados quando mandamos para o front end. Por exemplo: Não quero mandar a password do usuário pro front, mesmo que esteja criptografada, ai acontece a serialização antes de enviar para o front.

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
    origin: true,
    // origin é onde o front estará http://localhost:3000, porém quando estamos em ambiente de desenvolvimento, passamos apenas o true ou só o primeiro parametro direto, sem o obj. E quando estiver em PRD eu especifico a url do meu front para só ele poder usar a api.
});

app.register(fastifySwagger, {
    // Existem dois padrões para documentar. openapi e swagger file
    openapi: {
        info: {
            title: 'NLW connect',
            version: '0.0.1',
        },
    },
    // jsonSchemaTransform => Faz a integração de tudo que fizemos de validação, serialização (routes/subscribe-to-event-route) e transforma em documentação automatica
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    // Quando alguém acessar docs na api, ele irá acessar a documentação do swagger
});

app.register(subscribeToEventRoute);

app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP server running');
});

// cria a aplicação (const app = fastify())
// listen demora um pouco para acontecer e por isso usa o then para saber quando ela aconteceu e damos um log para saber quando servidor estiver no ar
