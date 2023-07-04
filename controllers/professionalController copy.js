const { Professional: ProfessionalModel, Professional } = require("../models/professional")
const { Patient: PatientModel, Patient } = require('../models/patient')
const regexLetters = /^[a-zA-Z]+$/;
const checkSpaces = /^\s*$/;
const mailRegex = /\S+@\S+\.\S+/;
const regexNumeros = /^[0-9]+$/
const cnpjRegex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/
const telephoneRegex = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
const stringTextRegex = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
const specialCharacters = /^[^!@#$%*+?]+$/;



const serviceController = {
    create: async (req, res) => {
        try {
            //const { name, age, profession, professionRegister, schedule, phone, sex, birth, zipCode, state, city, street, number, district, image } = req.body;
            const name = req.body.name || '';
            const profession = req.body.profession || '';
            const professionRegister = req.body.professionRegister || '';
            const cpf = req.body.cpf || '';
            const cnpj = req.body.cnpj || '';
            const mail = req.body.mail || '';
            const password = req.body.password;
            const phone = req.body.phone || '';
            const gender = req.body.gender || '';
            const birth = req.body.birth || '';
            const zipCode = req.body.zipCode || '';
            const state = req.body.state || '';
            const city = req.body.city || '';
            const street = req.body.street || '';
            const number = req.body.number || '';
            const district = req.body.district || '';
            const image = req.body.image || '';
            const myPlan = req.body.myPlan || '';
            const loginAttempts = req.body.loginAttempts || 0;
            const isBlocked = req.body.isBlocked || false;


            if (await Professional.findOne({ mail })) {
                return res.status(400).send({ error: "Email já Cadastrado" })
            }
            else {
                if (await Professional.findOne({ cpf })) {
                    return res.status(400).send({ error: "CPF já Cadastrado" })
                }
                else {
                    if (await Professional.findOne({ cnpj })) {
                        return res.status(400).send({ error: "CNPJ já Cadastrado" })
                    }
                }
            }

            // Validação Name
            if (name == null || name == "" || name.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
            }

            if (!name.match(regexLetters)) {
                return res.status(400).send({ alert: ["O campo Nome só permite letras"] });
            }

            if (name.length < 10 || name.length > 100) {
                return res.status(400).send({ alert: ["Campo nome deve ter mais de 10 caracteres e menos de 100 caracteres!"] })
            }





            // Validação profession
            if (profession == null || profession == "" || profession.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Profissão é obrigatório."] })
            }

            if (!profession.match(regexLetters)) {
                return res.status(400).send({ alert: ["O campo Profissão só permite letras"] });
            }





            // Validação professionRegister
            if (professionRegister == null || professionRegister == "" || professionRegister.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Registro do Profissional é obrigatório."] })
            }





            // Validação Email
            if (mail == null || mail == "" || mail.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Registro do Profissional é obrigatório."] })
            }
            if (!mail.match(mailRegex)) {
                return res.status(400).send({ alert: ["Formato de e-mail inválido"] });
            }




            // Validação cpf
            if (cpf == null || cpf == "" || cpf.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo CPF é obrigatório."] })
            }





            // Validação cnpj
            if (cnpj == null || cnpj == "" || cnpj.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo CNPJ é obrigatório."] })
            }





            // Validação phone
            if (phone == null || phone == "" || phone.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Telefone é obrigatório."] })
            }





            // Validação sex
            if (gender == null || gender == "" || gender.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Sexo é obrigatório."] })
            }




            // Validação birth
            if (birth == null || birth == "" || birth.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Data de Nascimento é obrigatório."] })
            }









            // Validação zipCode
            if (zipCode == null || zipCode == "" || zipCode.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Cep é obrigatório."] })
            }






            // Validação state
            if (state == null || state == "" || state.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo estado é obrigatório."] })
            }

            if (state.length != 2) {
                return res
                    .status(400)
                    .send({ alert: ["Quantidade de caracteres inválido. É pemitido apenas 2 caracteres no campo estado ex: SP."] });
            }





            // Validação city
            if (city == null || city == "" || city.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Cidade é obrigatório."] })
            }



            // Validação street
            if (street == null || street == "" || street.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Rua é obrigatório."] })
            }



            // Validação Numero
            if (number == null || number == "" || number.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Numero é obrigatório."] })
            }





            // Validação district
            if (district == null || district == "" || district.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Bairro é obrigatório."] })
            }
            if (!district.match(specialCharacters) || !district.match(regexLetters)) {
                return res.status(400).send({ alert: ["O campo só permite letras, caso tenha numero, escreva-o por extenso."] });
            }




            // Validação image
            if (image == null || image == "" || image.match(checkSpaces)) {
                return res.status(400).send({ alert: ["O campo Imagem é obrigatório."] })
            }
            if (myPlan == null || myPlan == "") {
                return res.status(400).send({ alert: ["O campo Meu Plano é obrigatório."] })
            }


            const service = {
                name,
                profession,
                professionRegister,
                cpf,
                cnpj,
                mail,
                password,
                phone,
                gender,
                birth,
                zipCode,
                state,
                city,
                street,
                number,
                district,
                image,
                myPlan,
                loginAttempts,
                isBlocked
            };

            const response = await ProfessionalModel.create(service);

            res.status(201).json({ response, msg: "Cadastro realizado com sucesso!, Cadastro será ativado após o Pagamento!" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao Cadastrar no Servidor" });
        }
    },

    getAll: async (req, res) => {
        try {
            const services = await ProfessionalModel.find()

            res.json(services);
        } catch (error) {
            console.log(error)
        }
    },

    getAllCount: async (req, res) => {
        try {
            const services = await ProfessionalModel.countDocuments()
            console.log(count)
            res.json(services);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const professionalId = await ProfessionalModel.findById(id);
            console.log(professionalId)
            if (!professionalId) {
                res.status(404).json({ msg: "Id não encontrado" });
                return;
            }
            res.json(professionalId);
        } catch (error) {
            console.log(error);
        }
    },

    getMail: async (req, res) => {
        try {
            const mail = req.params.mail;
            const professional = await ProfessionalModel.findOne({ mail });

            if (!professional) {
                res.status(404).json({ msg: "Profissional não encontrado" });
                return;
            }

            res.json(professional);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro ao buscar o profissional" });
        }
    },

    getPatients: async (req, res) => {
        try {
            const professionalId = req.params.id;
            console.log(professionalId)
            // Busque os pacientes vinculados ao profissional com o ID fornecido
            const patients = await PatientModel.find({ professionalId: professionalId });

            res.json(patients);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ocorreu um erro ao buscar os pacientes vinculados ao profissional" });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await ProfessionalModel.findById(id);

            if (!service) {
                res.status(404).json({ msg: "Id não encontrado" });
                return;
            }

            const deleteService = await ProfessionalModel.findByIdAndDelete(id)

            res.status(200).json({ deleteService, msg: "Cadastro excluído com sucesso" });
        } catch (error) {
            console.log(erro)
        }

    },

    update: async (req, res) => {
        const id = req.params.id;

        const service = {
            name: req.body.name,
            profession: req.body.profession,
            professionRegister: req.body.professionRegister,
            cnpj: req.body.cnpj,
            mail: req.body.mail,
            password: req.body.password,
            phone: req.body.phone,
            gender: req.body.gender,
            birth: req.body.birth,
            zipCode: req.body.zipCode,
            state: req.body.state,
            city: req.body.city,
            street: req.body.street,
            number: req.body.number,
            district: req.body.district,
            image: req.body.image,
            myPlan: req.body.myPlan,
            loginAttempts: req.body.loginAttempts,
            isBlocked: req.body.isBlocked
        };

        if (await Professional.findOne({ mail })) {
            return res.status(400).send({ error: "Email já Cadastrado" })
        }
        else {
            if (await Professional.findOne({ cpf })) {
                return res.status(400).send({ error: "CPF já Cadastrado" })
            }
            else {
                if (await Professional.findOne({ cnpj })) {
                    return res.status(400).send({ error: "CNPJ já Cadastrado" })
                }
            }
        }

        const updatedService = await ProfessionalModel.findByIdAndUpdate(id, service);

        if (!updatedService) {
            res.status(404).json({ msg: "Id não encontrado" });
            return;
        }

        res.status(200).json({ updatedService, msg: "Cadastro atualizado com sucesso" })


        

    },

    updateMyPlan: async (req, res) => {
        const id = req.params.id;

        const service = {
            myPlan: req.body.myPlan,
        };

        const updatedService = await ProfessionalModel.findByIdAndUpdate(id, service);

        if (!updatedService) {
            res.status(404).json({ msg: "Id não encontrado" });
            return;
        }

        res.status(200).json({ id, service, msg: "Meu plano atualizado com sucesso" })

    },



 







};

module.exports = serviceController;