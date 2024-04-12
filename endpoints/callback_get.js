const { GetCategorias } = require('./get/getCategoria');
const { GetLogin } = require('./get/getLogin');
const { GetProdutos } = require('./get/getProduto');

function CallbackGet() {
   GetLogin();
   GetCategorias();
   GetProdutos();
}

module.exports = { CallbackGet };
