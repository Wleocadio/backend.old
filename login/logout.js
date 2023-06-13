const jwt = require('jsonwebtoken');
const env = require('../.env');


const serviceLogout = {

  logout: (req, res) => {
    // Extrair o token do cabeçalho da solicitação
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Token de autorização não fornecido.' });
    }

    // Verificar e invalidar o token
    jwt.verify(token, env.authSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido.' });
      }

      // Retornar a resposta adequada
      let token = req.headers['authorization']
      token = null
      res.status(200).json({token, message: 'Logout realizado com sucesso.' });
    });
  },
};

module.exports = serviceLogout;