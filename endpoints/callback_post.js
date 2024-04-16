const PostCategorias = require('./post/postCategorias');
const PostFornecedores = require('./post/postFornecedores');
const PostProdutos = require('./post/postProdutos');

function CallbackPost() {
   PostCategorias();
   PostProdutos();
   PostFornecedores();
}

module.exports = { CallbackPost };
