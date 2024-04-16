const PutProduto = require('./put/putProdutos');
const PutCategoria = require('./put/putCategorias');
const PutFornecedores = require('./put/putFornecedores');
const PutCidade = require('./put/putCidade');

function CallbackPut() {
   PutCategoria();
   PutProduto();
   PutFornecedores();
   PutCidade();
}

module.exports = { CallbackPut };
