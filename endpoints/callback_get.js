const { GetTodasCategorias } = require('./get/getAllCategoria');
const { GetLogin } = require('./get/getLogin');
const { GetTodosProdutos } = require('./get/getAllProduto');
const { GetTodosFornecedores } = require('./get/getAllFornecedores');
const { GetTodasCidades } = require('./get/getAllCidades');
const { GetTodasEmpresas } = require('./get/getAllEmpresas');

function CallbackGet() {
   GetLogin();
   GetTodasCategorias();
   GetTodosProdutos();
   GetTodosFornecedores();
   GetTodasCidades();
   GetTodasEmpresas();
}

module.exports = { CallbackGet };
