const { Patient: PatientModel, Patient } = require('../models/patient')
const regexLetters = /^[a-zA-Z]+$/;
const checkSpaces = /^\s*$/;
const mailRegex = /\S+@\S+\.\S+/;
const regexNumeros = /^[0-9]+$/
const cnpjRegex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/
const telephoneRegex = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
const stringTextRegex = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
const specialCharacters = /^[^!@#$%*+?]+$/;


const patientController = {

  createPatient: async (req, res) => {

    try {

      //const { name, cpf, mail, phone, emergencyContact, nameEmergencyContact, gender, dateBirth, zipCode, state, city, district, street, number, reasonOfConsultation, observation, image, active } = req.body;
      const professionalID = req.userId; // Supondo que você tenha a informação do usuário logado
      const name = req.body.name || '';
      const cpf = req.body.cpf || '';
      const mail = req.body.mail || '';
      const phone = req.body.phone || '';
      const emergencyContact = req.body.emergencyContact || '';
      const nameEmergencyContact = req.body.nameEmergencyContact || '';
      const gender = req.body.gender || '';
      const dateBirth = req.body.dateBirth || '';
      const zipCode = req.body.zipCode || '';
      const state = req.body.state || '';
      const city = req.body.city || '';
      const district = req.body.district || '';
      const street = req.body.street || '';
      const number = req.body.number || '';
      const reasonOfConsultation = req.body.reasonOfConsultation || '';
      const observation = req.body.observation || '';
      const image = req.body.image || '';
      const active = req.body.active || '';


      const existingPatient = await PatientModel.findOne({ cpf: cpf });

      if (existingPatient) {
        return res.status(400).json({ error: "Já existe um cadastro com esse CPF" })
      }

      if (await PatientModel.findOne({ mail })) {
        return res.status(400).send({ error: "Já existe um cadastro com esse E-mail" })
      }


      // Validação Name
      if (name == null || name == "") {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }

      if (name.length < 10 || name.length > 100) {
        return res.status(400).send({ alert: ["Campo nome deve ter mais de 10 caracteres e menos de 100 caracteres!"] })
      }

      //Validação CPF
      if (cpf == null || cpf == "" || cpf.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Email
      if (mail == null || mail == "" || mail.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Telefone
      if (phone == null || phone == "" || phone.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Contato de Emergencia
      if (emergencyContact == null || emergencyContact == "" || emergencyContact.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Nome do contato de emergencia
      if (nameEmergencyContact == null || nameEmergencyContact == "" || nameEmergencyContact.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Sexo
      if (gender == null || gender == "" || gender.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Data de Nascimento
      if (dateBirth == null || dateBirth == "" || dateBirth.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Cep
      if (zipCode == null || zipCode == "" || zipCode.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação estado
      if (state == null || state == "" || state.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Cidade
      if (city == null || city == "" || city.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Bairro
      if (district == null || district == "" || district.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Rua
      if (street == null || street == "" || street.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação numero da residencia
      if (number == null || number == "" || number.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Motivo da consulta
      if (reasonOfConsultation == null || reasonOfConsultation == "" || reasonOfConsultation.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação Observação
      if (observation == null || observation == "" || observation.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação imagem
      if (image == null || image == "" || image.match(checkSpaces)) {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }



      //Validação ativo
      if (active == null || active == "") {
        return res.status(400).send({ alert: ["O campo Nome é obrigatório."] })
      }




      const newPatient = new PatientModel({
        name,
        cpf,
        mail,
        phone,
        emergencyContact,
        nameEmergencyContact,
        gender,
        dateBirth,
        zipCode,
        state,
        city,
        district,
        street,
        number,
        reasonOfConsultation,
        observation,
        image,
        active,
        professionalId: professionalID

      });
      //console.log(userID, date, observation, vague)

      await newPatient.save();
      res.status(201).json(newPatient);

    } catch (error) {// Ocorreu um erro ao criar a agenda
      console.error(error);
      res.status(500).json({ error: 'Erro ao cadastrar o Paciente' });

    };
  },
  // Configurção para Realizar o Get de todos os registros
  getAll: async (req, res) => {
    try {
      const services = await PatientModel.find()

      res.json(services);
    } catch (error) {
      console.log(error)
    }
  },
  // Configurção para Realizar o Get contando todos os registros
  getAllCount: async (req, res) => {
    try {
      const count = await PatientModel.find().countDocumets();

      res.json(count);
      console.log(count)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Configurção para Realizar o Get por Id
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const schedulesId = await PatientModel.findById(id);
      //console.log(id)
      if (!schedulesId) {
        res.status(404).json({ msg: "Id não encontrado" });
        return;
      }
      res.json(schedulesId);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const service = await PatientModel.findById(id);

      if (!service) {
        res.status(404).json({ msg: "Id não encontrado" });
        return;
      }

      const deleteService = await PatientModel.findByIdAndDelete(id)

      res.status(200).json({ deleteService, msg: "Cadastro excluído com sucesso" });
    } catch (error) {
      console.log(erro)
    }

  },

  update: async (req, res) => {
    const id = req.params.id;

    const service = {
      name: req.body.name,
      cpf: req.body.cpf,
      mail: req.body.mail,
      phone: req.body.phone,
      emergencyContact: req.body.emergencyContact,
      nameEmergencyContact: req.body.nameEmergencyContact,
      gender: req.body.gender,
      dateBirth: req.body.dateBirth,
      zipCode: req.body.zipCode,
      state: req.body.state,
      city: req.body.city,
      district: req.body.district,
      street: req.body.street,
      number: req.body.number,
      reasonOfConsultation: req.body.reasonOfConsultation,
      observation: req.body.observation,
      image: req.body.image,
      active: req.body.active
    };

    const updatedService = await PatientModel.findByIdAndUpdate(id, service);

    if (!updatedService) {
      res.status(404).json({ msg: "Id não encontrado" });
      return;
    }

    res.status(200).json({ updatedService, msg: "Cadastro atualizado com sucesso" })

  }
}

module.exports = patientController;

