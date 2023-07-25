const router = require("express").Router();
const serviceController = require("../controllers/professionalController");
const serviceLogin = require("../login/login")
const authenticateToken = require('../auth/auth')
const multer = require('multer');
const path = require('path');


// Função de validação do arquivo
function fileFilter(req, file, cb) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true); // Aceita o arquivo
    } else {
        cb(new Error('Formato de arquivo inválido. Aceitamos apenas imagens JPG ou PNG.'), false);
    }
}

// Configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/wleocadio/Desktop/projeto-qacoders/Projeto-Plataforma/plataforma/backend/uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'perfil-' + uniqueSuffix + ext);
    }
});


// Instância do multer com as configurações
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 512 * 512, // Limite de 2MB para o tamanho do arquivo
    }
})
//Login
router.post("/login", serviceLogin.login)



// Criar Cadastro
router
    .route("/professional/create")
    .post(upload.single('image'), (req, res) => serviceController.create(req, res));

//router
   // .route("/professional/create")
   // .post((req, res) => serviceController.create(req, res));


// Buscar todos os cadastros
router
    .route("/professional")
    .get(authenticateToken, (req, res) => serviceController.getAll(req, res))


// Buscar por ID
router
    .route("/professional/:id")
    .get(authenticateToken, (req, res) => serviceController.get(req, res))

router
    .route("/professional/photo/:id")
    .get(authenticateToken, (req, res) => serviceController.getPhoto(req, res))

router
    .route("/professional/mail/:mail")
    .get(authenticateToken, (req, res) => serviceController.getMail(req, res))

router
    .route("/professional/patients/:id")
    .get(authenticateToken, (req, res) => serviceController.getPatients(req, res))


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

router
    .route("/professional/myPlan/:id")
    .put(authenticateToken, (req, res) => serviceController.updateMyPlan(req, res))

router
    .route("/professional/photo/:id")
    .put(upload.single('image'), (req, res) => serviceController.updateMyImage(req, res))






module.exports = router;