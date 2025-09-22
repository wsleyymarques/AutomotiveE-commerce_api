const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "API Automotive E-commerce",
        version: "1.0.0",
        description: "Documentação gerada automaticamente pela biblioteca swagger-autogen"
    },
    host: "localhost:3333",
    basePath: "/api",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description: "Token JWT. Exemplo: 'Bearer ABC.DEF.GHI'"
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
