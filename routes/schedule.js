const router = require("express").Router();
const serviceLogin = require("../login/login")
const scheduleController = require('../controllers/scheduleController')
const authenticateToken = require('../auth/auth')


// Funções
//Login
router.post("/login", serviceLogin.login)

// Criar Cadastro
router
    .route("/schedules")
    .post(authenticateToken, (req, res) => scheduleController.createSchedule(req, res))


// Buscar todos os cadastros
router
    .route("/schedules")
    .get(authenticateToken, (req, res) => scheduleController.getAll(req, res))


// Buscar por ID
router
    .route("/schedules/:id")
    .get(authenticateToken, (req, res) => scheduleController.get(req, res))

router
    .route("/schedules/MySchedule/:id")
    .get(authenticateToken, (req, res) => scheduleController.getMyShedule(req, res))

router
    .route("/schedules/patientSchedule/:id")
    .get(authenticateToken, (req, res) => scheduleController.getPatientShedule(req, res))

// Contar todos os cadastros, não está funcionando
router
    .route("/schedules/count")
    .get(authenticateToken, (req, res) => scheduleController.getAllCount(req, res))



//Deletando Cadastros
router
    .route("/schedules/:id")
    .delete(authenticateToken, (req, res) => scheduleController.delete(req, res))


//Update de cadastros
router
    .route("/schedules/:id")
    .put(authenticateToken, (req, res) => scheduleController.update(req, res))


module.exports = router;