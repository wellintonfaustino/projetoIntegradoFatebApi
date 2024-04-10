const express = require('express');
const app = express();
exports.app = app;
require('dotenv').config();
const mysql = require('mysql');
const { getLogin } = require('./endpoints/get/getLogin');

const { mysqlConnection } = require('./mysql_con');
mysqlConnection(); // instancia o Mysql

const cors = require('cors');
app.use(cors()); // Habilita o CORS para todas as rotas

app.use(express.json());

getLogin();

app.listen(1024, () => console.log('O servidor está Online'));
