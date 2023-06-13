const jwt = require('jsonwebtoken')
const env = require('../.env')



const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Token de acesso não fornecido" });
    }

    jwt.verify(token, env.authSecret, (err, decoded, user) => {
        if (err) {
            return res.status(401).json({ error: "Token de acesso inválido" });
        }
       //req.user = user;
        req.userId = decoded.userId; // Adicione o ID do usuário ao objeto de solicitação
        next();
        //console.log(req.userId+" Auth")
    });
};

module.exports = authenticateToken;