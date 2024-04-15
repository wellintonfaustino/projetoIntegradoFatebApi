const { GetTodasCategorias } = require('./get/getAllCategoria');
const { GetLogin } = require('./get/getLogin');
const { GetTodosProdutos } = require('./get/getAllProduto');

function CallbackGet() {
   GetLogin();
   GetTodasCategorias();
   GetTodosProdutos();
}

module.exports = { CallbackGet };
