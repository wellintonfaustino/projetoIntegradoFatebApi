const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function getLogin() {
   app.get('/login', (req, res) => {
      const { login, senha } = req.headers;

      if (!login || !senha) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer um login e uma senha.' });
      }

      const con = mysqlConnection();

      con.query(
         'SELECT * FROM usuarios WHERE login = ? AND senha = ?',
         [login, senha],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res
                  .status(500)
                  .json({ error: 'Ocorreu um erro ao tentar fazer login.' });
            }

            if (results.length > 0) {
               res.json({ success: true, message: 'Login bem-sucedido.' });
            } else {
               res.status(401).json({ error: 'Credenciais inválidas.' });
            }
         },
      );
   });
}

exports.getLogin = getLogin;
