const { GetTodasCategorias } = require('./get/getAllCategoria');
const { GetLogin } = require('./get/getLogin');
const { GetTodosProdutos } = require('./get/getAllProduto');
const { GetTodosFornecedores } = require('./get/getAllFornecedores');

function CallbackGet() {
   GetLogin();
   GetTodasCategorias();
   GetTodosProdutos();
   GetTodosFornecedores();
}

module.exports = { CallbackGet };
