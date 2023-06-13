const router = require("express").Router();
const patientController = require("../controllers/patientController");
const serviceLogin = require("../login/login")
const authenticateToken = require('../auth/auth')


// Funções
//Login
router.post("/login", serviceLogin.login)
// Criar Cadastro
router
    .route("/patient/create")
    .post(authenticateToken,(req, res) => patientController.createPatient(req, res));


// Buscar todos os cadastros
router
    .route("/patient")
    .get(authenticateToken, (req, res) => patientController.getAll(req, res))


// Buscar por ID
router
    .route("/patient/:id")
    .get(authenticateToken, (req, res) => patientController.get(req, res))


// Contar todos os cadastros, não está funcionando

router
    .route('/patient/count')
    .get(authenticateToken, (req, res) => patientController.getAllCount(req, res))



//Deletando Cadastros
router
    .route("/patient/:id")
    .delete(authenticateToken, (req, res) => patientController.delete(req, res))


//Update de cadastros

router
    .route("/patient/:id")
    .put(authenticateToken, (req, res) => patientController.update(req, res))


module.exports = router;