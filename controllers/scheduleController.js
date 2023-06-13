const { Schedule: ScheduleModel, Schedule, } = require('../models/schedule')
const { Patient: PatientModel } = require('../models/patient')


const scheduleController = {

  createSchedule: async (req, res) => {

    const { date, vague, observation } = req.body;
    const patientName = req.body.patientName; 
    const userID = req.userId; // Supondo que você tenha a informação do usuário logado

    try {
      const existingSchedule = await ScheduleModel.findOne({ user: userID, date: new Date(date) });

      if (existingSchedule) {
        return res.status(400).json({ error: "Já existe um resgistro nessa data e horário" })
      }

      const patient = await PatientModel.findOne({ name: patientName })

      
      const newSchedule = new ScheduleModel({
        professionalId: userID,
        date: new Date(date),
        observation,
        vague,
      });
      console.log(userID, date,observation, vague, patient)

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
       vague: req.body.vague,
       observation: req.body.observation,
       
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

