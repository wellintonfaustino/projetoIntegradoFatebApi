const PutProduto = require('./put/putProdutos');
const PutCategoria = require('./put/putCategorias');
const PutFornecedores = require('./put/putFornecedores');
const PutCidade = require('./put/putCidade');
const PutEmpresas = require('./put/putEmpresas');

function CallbackPut() {
   PutCategoria();
   PutProduto();
   PutFornecedores();
   PutCidade();
   PutEmpresas();
}

module.exports = { CallbackPut };
