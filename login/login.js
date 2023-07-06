const { Professional } = require("../models/professional")
const bcrypty = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('../.env')


const serviceLogin = {
  // ...

  login: async (req, res) => {
    try {
      const { mail, password } = req.body;    
      const user = await Professional.findOne({ mail });
      const maxLoginAttempts = 3;
      //console.log(mail, password)
      //console.log(user)
      // Verifique se o usuário existe no banco de dados
      if (!user) {
        return res.status(401).json({ error: "Email inválido." });
      }

      // Verifica se a conta está bloqueada
      if (user.isBlocked) {
        return res.status(401).json({ error: 'A conta está bloqueada. Entre em contato com o Administrador.' });
      }
      const userName = user.name;
      const id = user.id;
      const image = user.image;
      // Verifique a senha do usuário
      const passwordMatch = await bcrypty.compare(password, user.password);
           
      if (!passwordMatch) {
        user.loginAttempts += 1;

        // Verifica se já foi excedido o limite de tentativas no Login
        if (user.loginAttempts >= maxLoginAttempts) {
          user.isBlocked = true
          await Professional.findByIdAndUpdate(user.id,{loginAttempts: user.loginAttempts, isBlocked: user.isBlocked});
          return res.status(401).json({ error: 'Limite de tentativas de login atingido. A conta foi bloqueada.' })
        }
       
        await Professional.findByIdAndUpdate(user.id,{loginAttempts: user.loginAttempts})
        return res.status(401).json({ error: "Senha inválida. O Usuário será bloqueado após a terceira tentativa." });
      }

      user.loginAttempts = 0;
      await Professional.findByIdAndUpdate(user.id,{loginAttempts: user.loginAttempts})// faz um update no campo loginAttempts do cadastro.

      // Cria um token de acesso com uma data de expiração em 24 horas 

      const token = jwt.sign({ userId: user._id }, env.authSecret, { expiresIn: '24h' });
      
      // Login bem-sucedido, retorna o token de acesso
      //console.log(image)
      res.json({id, userName, token, image });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao realizar o login" });
    }
  },

  // ...
};

module.exports = serviceLogin;