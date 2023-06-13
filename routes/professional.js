const router = require("express").Router();
const serviceController = require("../controllers/professionalController");
const serviceLogin = require("../login/login")
const authenticateToken = require('../auth/auth')


// Funções

//Login
router.post("/login", serviceLogin.login)



// Criar Cadastro
router
    .route("/professional/create")
    .post((req, res) => serviceController.create(req, res));


// Buscar todos os cadastros
router
    .route("/professional")
    .get(authenticateToken, (req, res) => serviceController.getAll(req, res))


// Buscar por ID
router
    .route("/professional/:id")
    .get(authenticateToken, (req, res) => serviceController.get(req, res))

// Contar todos os cadastros, não está funcionando
router
    .route('/professional/count')
    .get(authenticateToken, (req, res) => serviceController.getAllCount(req, res))


//Deletando Cadastros
router
    .route("/professional/:id")
    .delete(authenticateToken, (req, res) => serviceController.delete(req, res))

//Update de cadastros

router
    .route("/professional/:id")
    .put(authenticateToken, (req, res) => serviceController.update(req, res))


module.exports = router;