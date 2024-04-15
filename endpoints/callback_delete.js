const DeleteCategoria = require('./delete/deleteCategorias');
const DeleteProduto = require('./delete/deleteProduto');

function CallbackDelete() {
   DeleteCategoria();
   DeleteProduto();
}

module.exports = { CallbackDelete };
