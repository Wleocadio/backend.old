const { Patient: PatientModel, Patient } = require('../models/patient')
const regexLetters = /^[a-zA-ZÀ-ÿ\s]+$/;
const mailRegex = /\S+@\S+\.\S+/;
const regexNumeros = /^[0-9]+$/
const cpfRegex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;
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
      const maritalStatus = req.body.maritalStatus || '';
      const zipCode = req.body.zipCode || '';
      const state = req.body.state || '';
      const city = req.body.city || '';
      const district = req.body.district || '';
      const street = req.body.street || '';
      const number = req.body.number || '';
      const initialDemand = req.body.initialDemand || '';
      const purposeTreatment = req.body.purposeTreatment || '';
      const patientEvolution = req.body.patientEvolution || '';
      const generalNotes = req.body.generalNotes || '';
      const image = req.body.image || '';
      const active = req.body.active || true;

      const nameError = validateName(name);
      const cpfError = validateCpf(cpf);
      const mailError = validatEmail(mail);
      const phoneError = validatePhone(phone);
      const emergencyContactError = validatePhoneEmergency(emergencyContact);
      const nameEmergencyContactError = validateNameEmergency(nameEmergencyContact);
      const genderError = validateGender(gender);
      const birthError = validateBirth(dateBirth);
      const maritalStatusError = validateMaritalStatus(maritalStatus);
      const zipCodeError = validateZipCode(zipCode);
      const stateError = validateState(state);
      const cityError = validateCity(city);
      const districtError = validateDistrict(district);
      const streetError = validateStreet(street);
      const numberError = validateNumber(number);
      const initialDemandError = validateInitialDemand(initialDemand);
      const purposeTreatmentError = validatepurposeTreatment(purposeTreatment);
      const patientEvolutionError = validatepatientEvolution(patientEvolution);
      const generalNotesError = validategeneralNotes(generalNotes);


      if (nameError) {
        return res.status(400).send({ error: nameError });
      }
      if (mailError) {
        return res.status(400).send({ error: mailError });
      }
      if (cpfError) {
        return res.status(400).send({ error: cpfError });
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
      if (emergencyContactError) {
        return res.status(400).send({ error: emergencyContactError });
      }
      if (nameEmergencyContactError) {
        return res.status(400).send({ error: nameEmergencyContactError });
      }
      if (maritalStatusError) {
        return res.status(400).send({ error: maritalStatusError });
      }
      if (initialDemandError) {
        return res.status(400).send({ error: initialDemandError });
      }
      if (purposeTreatmentError) {
        return res.status(400).send({ error: purposeTreatmentError });
      }
      if (patientEvolutionError) {
        return res.status(400).send({ error: patientEvolutionError });
      }
      if (generalNotesError) {
        return res.status(400).send({ error: generalNotesError });
      }


      const existingPatient = await PatientModel.findOne({ cpf: cpf });

      if (existingPatient) {
        return res.status(400).json({ error: "Já existe um cadastro com esse CPF" })
      }

      if (await PatientModel.findOne({ mail })) {
        return res.status(400).send({ error: "Já existe um cadastro com esse E-mail" })
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
        maritalStatus,
        zipCode,
        state,
        city,
        district,
        street,
        number,
        initialDemand,
        purposeTreatment,
        patientEvolution,
        generalNotes,
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

      //schedulesId.sort((a,b) => b.createdAt - a.createdAt)

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
      maritalStatus: req.body.maritalStatus,
      zipCode: req.body.zipCode,
      state: req.body.state,
      city: req.body.city,
      district: req.body.district,
      street: req.body.street,
      number: req.body.number,
      initialDemand: req.body.initialDemand,
      purposeTreatment: req.body.purposeTreatment,
      patientEvolution: req.body.patientEvolution,
      generalNotes: req.body.generalNotes,
      image: req.body.image,
      active: req.body.active
    };

    const nameError = validateName(service.name);
      const cpfError = validateCpf(service.cpf);
      const mailError = validatEmail(service.mail);
      const phoneError = validatePhone(service.phone);
      const emergencyContactError = validatePhoneEmergency(service.emergencyContact);
      const nameEmergencyContactError = validateNameEmergency(service.nameEmergencyContact);
      const genderError = validateGender(service.gender);
      const birthError = validateBirth(service.dateBirth);
      const maritalStatusError = validateMaritalStatus(service.maritalStatus);
      const zipCodeError = validateZipCode(service.zipCode);
      const stateError = validateState(service.state);
      const cityError = validateCity(service.city);
      const districtError = validateDistrict(service.district);
      const streetError = validateStreet(service.street);
      const numberError = validateNumber(service.number);
      const initialDemandError = validateInitialDemand(service.initialDemand);
      const purposeTreatmentError = validatepurposeTreatment(service.purposeTreatment);
      const patientEvolutionError = validatepatientEvolution(service.patientEvolution);
      const generalNotesError = validategeneralNotes(service.generalNotes);


      if (nameError) {
        return res.status(400).send({ error: nameError });
      }
      if (mailError) {
        return res.status(400).send({ error: mailError });
      }
      if (cpfError) {
        return res.status(400).send({ error: cpfError });
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
      if (emergencyContactError) {
        return res.status(400).send({ error: emergencyContactError });
      }
      if (nameEmergencyContactError) {
        return res.status(400).send({ error: nameEmergencyContactError });
      }
      if (maritalStatusError) {
        return res.status(400).send({ error: maritalStatusError });
      }
      if (initialDemandError) {
        return res.status(400).send({ error: initialDemandError });
      }
      if (purposeTreatmentError) {
        return res.status(400).send({ error: purposeTreatmentError });
      }
      if (patientEvolutionError) {
        return res.status(400).send({ error: patientEvolutionError });
      }
      if (generalNotesError) {
        return res.status(400).send({ error: generalNotesError });
      }


    const updatedService = await PatientModel.findByIdAndUpdate(id, service);

    if (!updatedService) {
      res.status(404).json({ msg: "Id não encontrado" });
      return;
    }

    res.status(200).json({ updatedService, msg: "Cadastro atualizado com sucesso" })

  }
}




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


// Validação Name Emergencia
const validateNameEmergency = (nameEmergency) => {

  if (!nameEmergency.match(regexLetters)) {
    return "O campo Nome do contato de emergencia só permite letras.";
  }

  if (nameEmergency.length > 100) {
    return "Campo Nome deve ter no maximo 50 caracteres!";
  }

  return null; // Retorna null se a validação passar
};


// Validação phone Emergencia
const validatePhoneEmergency = (phoneEmergency) => {
  if (!phoneEmergency.match(regexNumeros)) {
    return "O campo Telefone de emergencia só aceita numeros."
  }

  if (phoneEmergency.length > 20) {
    return "O campo Telefone de emergencia deve ser menor que 20 caracteres."
  }


  return null; // Retorna null se a validação passar
}




// Validação sex
const validateGender = (gender) => {

  if (!gender.match(regexLetters)) {
    return "O campo Sexo só aceita letras."
  }

  if (gender.length > 20) {
    return "O campo Sexo deve ser menor que 20 caracteres."
  }


  return null; // Retorna null se a validação passar
}



// Validação birth - Formato da data "2023-03-28"
const validateBirth = (dateBirth) => {
  if (dateBirth == null || dateBirth.trim() === '') {
    return "O campo Nascimento é obrigatório.";
  }

  const currentDate = new Date();
  const birthDate = new Date(dateBirth);
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

// Validação Estado civil
const validateMaritalStatus = (MaritalStatus) => {

  if (MaritalStatus.match(regexNumeros)) {
    return "O campo Estado Civil só aceita letras."
  }

  if (MaritalStatus.length > 15) {
    return "O campo Estado Civil deve ter no maximo 15 caracteres."
  }


  return null; // Retorna null se a validação passar
}




// Validação zipCode
const validateZipCode = (zipCode) => {
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
  if (!district.match(regexLetters)) {
    return "O campo Bairro só permite letras."
  }

  if (district.length > 50) {
    return "O campo Bairro deve ter no maximo 50 caracteres."
  }
  return null; // Retorna null se a validação passar
}

const validateInitialDemand = (initialDemand) => {
  if (initialDemand == null || initialDemand.trim() === '') {
    return "O campo Demanda inicial é obrigatório.";
  }

  if (!initialDemand.match(regexLetters)) {
    return "O campo Demanda inicial só permite letras.";
  }

  if (initialDemand.length > 100) {
    return "Campo Demanda inicial deve ter no maximo 100 caracteres!";
  }

  return null; // Retorna null se a validação passar
};

const validatepurposeTreatment = (purposeTreatment) => {

  if (purposeTreatment.length > 300) {
    return "Campo Plano de tratamento deve ter no maximo 300 caracteres!";
  }

  return null; // Retorna null se a validação passar
};


const validatepatientEvolution = (patientEvolution) => {

  if (patientEvolution.length > 500) {
    return "Campo Evolução do paciente deve ter no maximo 500 caracteres!";
  }

  return null; // Retorna null se a validação passar
};


const validategeneralNotes = (generalNotes) => {
  if (generalNotes.length > 550) {
    return "Campo Observações deve ter no maximo 550 caracteres!";
  }

  return null; // Retorna null se a validação passar
};









module.exports = patientController;

