const { Professional: ServiceModel } = require("../models/professional")

const serviceController = {
    create: async (req, res) => {
        try {
            const service = {
                name: req.body.name,
                idade: req.body.idade,
                profissao: req.body.profissao,
                professionRegister: req.body.registroProfissional,
                telefone: req.body.telefone,
                Whatsapp: req.body.Whatsapp,
                sexo: req.body.sexo,
                nascimento: req.body.nascimento,
                cep: req.body.cep,
                estado: req.body.estado,
                cidade: req.body.cidade,
                rua: req.body.rua,
                numero: req.body.numero,
                bairro: req.body.bairro,
                image: req.body.image,


            };

            const response = await ServiceModel.create(service);

            res.status(201).json({ response, msg: "Cadastro realizado com sucesso!" });

        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const services = await ServiceModel.find()

            res.json(services);
        } catch (error) {
            console.log(error)
        }
    },

    getAllCount: async (req, res) => {
        try {
            const count = await ServiceModel.countDocuments();

            res.json(count);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    },



};

module.exports = serviceController;