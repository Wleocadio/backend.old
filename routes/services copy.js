const router = require("express").Router();
const serviceController = require("../controllers/serviceController");
const serviceLogin = require("../login/login")
const scheduleController = require('../schedule/schedule')
const authenticateToken = require('../auth/auth')


// Funções

//Login
router.post("/login", serviceLogin.login)

// Criar Cadastro
router
    .route("/professional/create")
    .post((req, res) => serviceController.create(req, res));


router
    .route("/schedules")
    .post(authenticateToken, (req, res) => scheduleController.createSchedule(req, res))


// Buscar todos os cadastros
router
    .route("/professional")
    .get(authenticateToken, (req, res) => serviceController.getAll(req, res))

router
    .route("/schedules")
    .get(authenticateToken, (req, res) => scheduleController.getAll(req, res))


// Buscar por ID
router
    .route("/professional/:id")
    .get(authenticateToken, (req, res) => serviceController.get(req, res))

router
    .route("/schedules/:id")
    .get(authenticateToken, (req, res) => scheduleController.get(req, res))

// Contar todos os cadastros, não está funcionando

router
    .route('/professional/count')
    .get(authenticateToken, (req, res) => serviceController.getAllCount(req, res))

router
    .route("/schedules/count")
    .get(authenticateToken, (req, res) => scheduleController.getAllCount(req, res))



//Deletando Cadastros
router
    .route("/schedules/:id")
    .delete(authenticateToken, (req, res) => scheduleController.delete(req, res))

router
    .route("/professional/:id")
    .delete(authenticateToken, (req, res) => serviceController.delete(req, res))

//Update de cadastros

router
    .route("/schedules/:id")
    .put(authenticateToken, (req, res) => scheduleController.update(req, res))


module.exports = router;