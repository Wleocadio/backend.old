const { Professional: ProfessionalModel, Professional } = require("../models/professional")
const { Patient: PatientModel, Patient } = require('../models/patient')
const regexLetters = /^[a-zA-Z\s]+$/;
const mailRegex = /\S+@\S+\.\S+/;
const regexNumeros = /^[0-9]+$/
const cnpjRegex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/
const cpfRegex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

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
            const myPlan = req.body.myPlan || '';
            const loginAttempts = req.body.loginAttempts || 0;
            const isBlocked = req.body.isBlocked || false;
            const image = fs.readFileSync(req.file.path)
            //const imagePath = req.file.path;

            // chamada para validações dos campons
            const nameError = validateName(name);
            const professionError = validateProfession(profession);
            const professionRegisterError = validateProfessionRegister(professionRegister);
            const cpfError = validateCpf(cpf);
            const cnpjError = validateCnpj(cnpj);
            const mailError = validatEmail(mail);
            const phoneError = validatePhone(phone);
            const genderError = validateGender(gender);
            const birthError = validateBirth(birth);
            const zipCodeError = validateZipCode(zipCode);
            const stateError = validateState(state);
            const cityError = validateCity(city);
            const streetError = validateStreet(street);
            const numberError = validateNumber(number);
            const districtError = validateDistrict(district);
            
            const myPlanError = validateMyPlan(myPlan);


            if (nameError) {
                return res.status(400).send({ error: nameError });
            }
            if (professionError) {
                return res.status(400).send({ error: professionError });
            }
            if (professionRegisterError) {
                return res.status(400).send({ error: professionRegisterError });
            }
            if (mailError) {
                return res.status(400).send({ error: mailError });
            }
            if (cpfError) {
                return res.status(400).send({ error: cpfError });
            }
            if (cnpjError) {
                return res.status(400).send({ error: cnpjError });
            }
            if (phoneError) {
                return res.status(400).send({ error: phoneError });
            }
            if (genderError) {
                return res.status(400).send({ error: genderError });
            }
            if (birthError) {
                return res.status(400).send({ error: birthError });
            }
            if (zipCodeError) {
                return res.status(400).send({ error: zipCodeError });
            }
            if (stateError) {
                return res.status(400).send({ error: stateError });
            }
            if (cityError) {
                return res.status(400).send({ error: cityError });
            }
            if (streetError) {
                return res.status(400).send({ error: streetError });
            }
            if (numberError) {
                return res.status(400).send({ error: numberError });
            }
            if (districtError) {
                return res.status(400).send({ error: districtError });
            }
           

            if (myPlanError) {
                return res.status(400).send({ error: myPlanError });
            }

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
            // console.log(count)
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

            //const imageUrl = `/uploads/${professionalId.image}`
            const imageUrl = `http://localhost:3000/uploads/${professionalId.image}`;

            //console.log(professionalId)
            if (!professionalId) {
                res.status(404).json({ msg: "Id não encontrado" });
                return;
            }
            professionalId.image = imageUrl
            res.status(200).json({ professionalId });
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
            //  console.log(professionalId)
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
            cpf: req.body.cpf,
            cnpj: req.body.cnpj,
            mail: req.body.mail,
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

        const nameError = validateName(service.name);
        const professionError = validateProfession(service.profession);
        const professionRegisterError = validateProfessionRegister(service.professionRegister);
        const cpfError = validateCpf(service.cpf);
        const cnpjError = validateCnpj(service.cnpj);
        const mailError = validatEmail(service.mail);
        const phoneError = validatePhone(service.phone);
        const genderError = validateGender(service.gender);
        const birthError = validateBirth(service.birth);
        const zipCodeError = validateZipCode(service.zipCode);
        const stateError = validateState(service.state);
        const cityError = validateCity(service.city);
        const streetError = validateStreet(service.street);
        const numberError = validateNumber(service.number);
        const districtError = validateDistrict(service.district);
        const imageError = validateImage(service.image);
        const myPlanError = validateMyPlan(service.myPlan);



        if (nameError) {
            return res.status(400).send({ error: nameError });
        }
        if (professionError) {
            return res.status(400).send({ error: professionError });
        }
        if (professionRegisterError) {
            return res.status(400).send({ error: professionRegisterError });
        }
        if (mailError) {
            return res.status(400).send({ error: mailError });
        }
        if (cpfError) {
            return res.status(400).send({ error: cpfError });
        }
        if (cnpjError) {
            return res.status(400).send({ error: cnpjError });
        }
        if (phoneError) {
            return res.status(400).send({ error: phoneError });
        }
        if (genderError) {
            return res.status(400).send({ error: genderError });
        }
        if (birthError) {
            return res.status(400).send({ error: birthError });
        }
        if (zipCodeError) {
            return res.status(400).send({ error: zipCodeError });
        }
        if (stateError) {
            return res.status(400).send({ error: stateError });
        }
        if (cityError) {
            return res.status(400).send({ error: cityError });
        }
        if (streetError) {
            return res.status(400).send({ error: streetError });
        }
        if (numberError) {
            return res.status(400).send({ error: numberError });
        }
        if (districtError) {
            return res.status(400).send({ error: districtError });
        }
        if (imageError) {
            return res.status(400).send({ error: imageError });
        }
        if (myPlanError) {
            return res.status(400).send({ error: myPlanError });
        }


        const updatedService = await ProfessionalModel.findByIdAndUpdate(id, service);

        if (!updatedService) {
            res.status(404).json({ msg: "Id não encontrado" });
            return;
        }

        res.status(200).json({ service, msg: "Cadastro atualizado com sucesso" })

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

// Validação Name
const validateName = (name) => {
    if (name == null || name.trim() === '') {
        return "O campo Nome é obrigatório.";
    }

    if (!name.match(regexLetters)) {
        return "O campo Nome só permite letras.";
    }

    if (name.length > 100) {
        return "Campo Nome deve ter no maximo 50 caracteres!";
    }

    return null; // Retorna null se a validação passar
};


// Validação profession
const validateProfession = (profession) => {
    if (profession == null || profession.trim() === '') {
        return "O campo Profissão é obrigatório."
    }

    if (!profession.match(regexLetters)) {
        return "O campo Profissão só permite letras.";
    }

    if (profession.length > 50) {
        return "Campo Profissão deve ter no maximo 50 caracteres!";
    }

    return null; // Retorna null se a validação passar
}


// Validação professionRegister
const validateProfessionRegister = (professionRegister) => {
    if (professionRegister == null || professionRegister.trim() === '') {
        return "O campo Registro do Profissional é obrigatório."
    }

    if (!professionRegister.match(regexNumeros)) {
        return "O campo Registro do Profissional só aceita numeros."
    }

    if (professionRegister.length > 20) {
        return "O campo Registro do Profissional deve ter no maximo 20 caracteres."
    }



    return null; // Retorna null se a validação passar
}



// Validação Email
const validatEmail = (mail) => {
    if (mail == null || mail.trim() === '') {
        return "O campo Registro do Profissional é obrigatório."
    }
    if (!mail.match(mailRegex)) {
        return "Formato de e-mail inválido."

    }
    return null; // Retorna null se a validação passar
}



// Validação cpf
const validateCpf = (cpf) => {
    if (cpf == null || cpf.trim() === '') {
        return "O campo CPF é obrigatório."
    }

    if (!cpf.match(regexNumeros)) {
        return "O campo CPF só aceita numeros."
    }

    if (!cpf.match(cpfRegex)) {
        return "CPF Formato inválido."
    }



    return null; // Retorna null se a validação passar
}



// Validação cnpj
const validateCnpj = (cnpj) => {
    if (cnpj == null || cnpj.trim() === '') {
        return "O campo CNPJ é obrigatório."
    }

    if (!cnpj.match(regexNumeros)) {
        return "O campo CNPJ só aceita numeros."
    }

    if (!cnpj.match(cnpjRegex)) {
        return "CNPJ Inválido."
    }

    return null; // Retorna null se a validação passar
}



// Validação phone
const validatePhone = (phone) => {
    if (phone == null || phone.trim() === '') {
        return "O campo Telefone é obrigatório."
    }

    if (!phone.match(regexNumeros)) {
        return "O campo Telefone só aceita numeros."
    }

    if (phone.length > 20) {
        return "O campo Telefone deve ser menor que 20 caracteres."
    }


    return null; // Retorna null se a validação passar
}



// Validação sex
const validateGender = (gender) => {
    if (gender == null || gender.trim() === '') {
        return "O campo Sexo é obrigatório."
    }

    if (!gender.match(regexLetters)) {
        return "O campo Sexo só aceita letras."
    }

    if (gender.length > 20) {
        return "O campo Sexo deve ser menor que 20 caracteres."
    }


    return null; // Retorna null se a validação passar
}



// Validação birth - Formato da data "2023-03-28"
const validateBirth = (birth) => {
    if (birth == null || birth.trim() === '') {
        return "O campo Nascimento é obrigatório.";
    }

    const currentDate = new Date();
    const birthDate = new Date(birth);
    const minYear = 1900;

    const birthYear = birthDate.getFullYear();
    const ageDiff = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    const dayDiff = currentDate.getDate() - birthDate.getDate();

    if (birthDate > currentDate) {
        return "A data de nascimento deve ser anterior à data atual.";
    }

    if (ageDiff < 18 || (ageDiff === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        return "É necessário ter pelo menos 18 anos.";
    }


    if (birthYear < minYear) {
        return "A data de nascimento deve ser a partir de 1900.";
    }

    return null; // Retorna null se a validação passar
}




// Validação zipCode
const validateZipCode = (zipCode) => {
    if (zipCode == null || zipCode.trim() === '') {
        return "O campo Cep é obrigatório."
    }

    if (!zipCode.match(regexNumeros)) {
        return "O campo Cep só aceita numeros."
    }

    if (zipCode.length > 20) {
        return "O campo Cep deve ter menos de 20 caracteres."
    }


    return null; // Retorna null se a validação passar
}



// Validação state
const validateState = (state) => {
    if (state == null || state.trim() === '') {
        return "O campo estado é obrigatório."
    }

    if (state.length != 2) {
        return "Quantidade de caracteres inválido. É pemitido apenas 2 caracteres no campo estado ex: SP."
    }

    if (!state.match(regexLetters)) {
        return "O campo estado só aceita letras."
    }


    return null; // Retorna null se a validação passar
}



// Validação city
const validateCity = (city) => {
    if (city == null || city.trim() === '') {
        return "O campo Cidade é obrigatório."
    }

    if (!city.match(regexLetters)) {
        return "O campo Cidade só aceita letras."
    }

    if (city.length > 50) {
        return "O campo Cidade deve ter no maximo 50 caracteres."
    }


    return null; // Retorna null se a validação passar
}


// Validação street
const validateStreet = (street) => {
    if (street == null || street.trim() === '') {
        return "O campo Rua é obrigatório."
    }

    if (!street.match(regexLetters)) {
        return "O campo Rua só aceita letras."
    }

    if (street.length > 50) {
        return "O campo Rua deve ter no maximo 50 caracteres."
    }
    return null; // Retorna null se a validação passar
}


// Validação Numero
const validateNumber = (number) => {
    console.log(number)
    if (number == null || number.trim() === '') {
        return "O campo Numero é obrigatório."
    }

    if (!number.match(regexNumeros)) {
        return "O campo Numero só aceita numeros."
    }

    if (number > 10000) {
        return "O campo Numero deve ser menor de 10000."
    }

    return null; // Retorna null se a validação passar
}



// Validação district
const validateDistrict = (district) => {
    if (district == null || district.trim() === '') {
        return "O campo Bairro é obrigatório."
    }
    if (!district.match(regexLetters)) {
        return "O campo Bairro só permite letras."
    }

    if (district.length > 50) {
        return "O campo Bairro deve ter no maximo 50 caracteres."
    }
    return null; // Retorna null se a validação passar
}


// Validação do Plano
const validateMyPlan = (myPlan) => {

    if (myPlan == null || myPlan.trim() === '') {
        return "O campo Meu Plano é obrigatório."
    }
    if (!myPlan.match(regexLetters)) {
        return "O campo Meu Plano só aceita letras."
    }


    return null; // Retorna null se a validação passar
}







module.exports = serviceController;