const PutProduto = require('./put/putProdutos');
const PutCategoria = require('./put/putCategorias');
const PutFornecedores = require('./put/putFornecedores');

function CallbackPut() {
   PutCategoria();
   PutProduto();
   PutFornecedores();
}

module.exports = { CallbackPut };
