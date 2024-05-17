const express = require('express');
const app = express();
exports.app = app;
require('dotenv').config();

const cors = require('cors');
app.use(cors()); // Habilita o CORS para todas as rotas

//chama os endpoints
const { CallbackGet } = require('./endpoints/CallbackGet');
const { CallbackDelete } = require('./endpoints/CallbackDelete');
const { CallbackPut } = require('./endpoints/CallbackPut');
const { CallbackPost } = require('./endpoints/CallbackPost');
CallbackGet();
CallbackDelete();
CallbackPost();
CallbackPut();

const swaggerConfig = require('./../api/swaggerConfig');

// Configuração do Swagger
swaggerConfig(app);

app.use(express.json());
app.listen(1024, () => console.log('O servidor está Online'));
