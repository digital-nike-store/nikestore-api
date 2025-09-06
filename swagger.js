const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "API Animes Express",
        description: "Esta documentação descreve a API da Animes Express, uma plataforma de chats para animes."
    },
    servers: [
        {
            url: 'http://localhost:3030'
        }
    ],
    components: {
        schemas: {
            // someSchema: {},
        },
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/app']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')
})