const express = require('express');
const app = express();
exports.app = app;
require('dotenv').config();

const cors = require('cors');
app.use(cors()); // Habilita o CORS para todas as rotas

//chama os endpoints
const { CallbackGet } = require('./endpoints/callback_get');
const { CallbackDelete } = require('./endpoints/callback_delete');
const { CallbackPut } = require('./endpoints/callback_put');
const { CallbackPost } = require('./endpoints/callback_post');
CallbackGet();
CallbackDelete();
CallbackPost();
CallbackPut();

const swaggerConfig = require('./../api/swaggerConfig');

// Configuração do Swagger
swaggerConfig(app);

app.use(express.json());
app.listen(1024, () => console.log('O servidor está Online'));
