const PostCategorias = require('./post/postCategorias');
const PostCidades = require('./post/postCidades');
const PostFornecedores = require('./post/postFornecedores');
const PostProdutos = require('./post/postProdutos');

function CallbackPost() {
   PostCategorias();
   PostProdutos();
   PostFornecedores();
   PostCidades();
}

module.exports = { CallbackPost };
