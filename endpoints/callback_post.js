const PostCategorias = require('./post/postCategorias');
const PostCidades = require('./post/postCidades');
const PostEmpresas = require('./post/postEmpresas');
const PostFornecedores = require('./post/postFornecedores');
const PostProdutos = require('./post/postProdutos');

function CallbackPost() {
   PostCategorias();
   PostProdutos();
   PostFornecedores();
   PostCidades();
   PostEmpresas();
}

module.exports = { CallbackPost };
