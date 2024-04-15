const PutProduto = require('./put/putProdutos');
const PutCategoria = require('./put/putCategorias');

function CallbackPut() {
   PutCategoria();
   PutProduto();
}

module.exports = { CallbackPut };
