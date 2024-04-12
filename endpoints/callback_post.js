const PostCategorias = require('./post/postCategorias');
const PostProdutos = require('./post/postProdutos');

function CallbackPost() {
   PostCategorias();
   PostProdutos();
}

module.exports = { CallbackPost };
