const { GetTodasCategorias } = require('./get/getAllCategoria');
const { GetLogin } = require('./get/getLogin');
const { GetTodosProdutos } = require('./get/getAllProduto');
const { GetTodosFornecedores } = require('./get/getAllFornecedores');
const { GetTodasCidades } = require('./get/getAllCidades');
const { GetTodasEmpresas } = require('./get/getAllEmpresas');
const { GetTodosClientes } = require('./get/getAllClientes');
const { GetTodosClientesTelefone } = require('./get/getAllClientesTeefone');
const GetTodasFormasPagamento = require('./get/getAllFormaPgamento');
const GetUsuarios = require('./get/getAllUsuarios');

function CallbackGet() {
   GetLogin();
   GetTodasCategorias();
   GetTodosProdutos();
   GetTodosFornecedores();
   GetTodasCidades();
   GetTodasEmpresas();
   GetTodosClientes();
   GetTodosClientesTelefone();
   GetTodasFormasPagamento();
   GetUsuarios();
}

module.exports = { CallbackGet };
