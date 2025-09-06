const app = require("./src/app");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const bodyParser = require('body-parser');

const port = 3030;

/* Middlewares */
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port , () => {
  console.log("A API esta sendo executada na porta 3030");
});
