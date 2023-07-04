const { Schedule: ScheduleModel, Schedule, } = require('../models/schedule')
const { Patient: PatientModel } = require('../models/patient')


const scheduleController = {

  createSchedule: async (req, res) => {

    const { date, notes,duration,serviceValue } = req.body;
    const vague = req.body.vague || false;
    const patientId = req.body.patientId; 
    const userID = req.userId; // Supondo que você tenha a informação do usuário logado

    try {
      const existingSchedule = await ScheduleModel.findOne({ professionalId: userID, date: new Date(date) });

      if (existingSchedule) {
        return res.status(400).json({ error: "Já existe um resgistro nessa data e horário" })
      }

      const patient = await PatientModel.findById(patientId)
      
      const newSchedule = new ScheduleModel({
        professionalId: userID,
        date: new Date(date),
        serviceValue,
        notes,
        vague,
        duration,
        patientName:patient.name
                     
      });
      //console.log(userID, date,notes, vague,serviceValue, patientId)

      if(patient){
        newSchedule.patientId = patient._id;
      }

      await newSchedule.save();
      res.status(201).json(newSchedule);

    } catch (error) {// Ocorreu um erro ao criar a agenda
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar a agenda' });

    };
  },
  // Configurção para Realizar o Get de todos os registros
  getAll: async (req, res) => {
    try {
      const services = await ScheduleModel.find()

      res.json(services);
    } catch (error) {
      console.log(error)
    }
  },
  // Configurção para Realizar o Get contando todos os registros
  getAllCount: async (req, res) => {
    try {
      const count = await ScheduleModel.find().countDocumets();

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
      const schedulesId = await ScheduleModel.findById(id);
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
  getMyShedule: async (req, res) => {
    try {
      const professionalId = req.params.id;
      const schedulesId = await ScheduleModel.find({professionalId: professionalId});
      console.log(professionalId)
      if (schedulesId.length === 0) {
        return res.status(404).json({ msg: "Nenhum agendamento encontrado para o profissional" });
      }
      res.json(schedulesId);
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro ao buscar a Agenda do profissional" });
    }
  },
  getPatientShedule: async (req, res) => {
    try {
      const patientId = req.params.id;
      const schedulesId = await ScheduleModel.find({patientId: patientId});
      console.log(patientId)
      if (schedulesId.length === 0) {
        return res.status(404).json({ msg: "Nenhum agendamento encontrado para o paciente" });
      }
      res.json(schedulesId);
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro ao buscar a Agenda do paciente" });
    }
  },
  delete: async(req, res) => {
    try {
      const id = req.params.id;
      const service = await ScheduleModel.findById(id);

      if (!service) {
        res.status(404).json({ msg: "Id não encontrado" });
        return;
      }

      const deleteService = await ScheduleModel.findByIdAndDelete(id)

      res.status(200).json({deleteService, msg: "Cadastro excluído com sucesso"});
    } catch (error) {
      console.log(erro)
    }
    
  },

  update: async (req, res)=>{
    const id = req.params.id;

    const service = {
      patientId:req.body.patient,
       date: req.body.date,
       serviceValue: req.body.serviceValue,
       vague: req.body.vague,
       notes: req.body.notes,
       duration: req.body.duration,
       
    };

    const updatedService = await ScheduleModel.findByIdAndUpdate(id, service);

    if (!updatedService) {
      res.status(404).json({updatedService, msg: "Id não encontrado" });
      return;
    }

    res.status(200).json({service, msg: "Cadastro atualizado com sucesso"})

  }
}

module.exports = scheduleController;

