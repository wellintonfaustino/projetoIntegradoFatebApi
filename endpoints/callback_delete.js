const DeleteCategoria = require('./delete/deleteCategorias');
const DeleteFornecedor = require('./delete/deleteFornecedores');
const DeleteProduto = require('./delete/deleteProduto');

function CallbackDelete() {
   DeleteCategoria();
   DeleteProduto();
   DeleteFornecedor();
}

module.exports = { CallbackDelete };
