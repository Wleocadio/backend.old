const mongoose = require("mongoose")
//const { Schema } = mongoose;

const patientSchema = new mongoose.Schema({
    professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true, loewrcase: true },
    phone: { type: Number, required: true },
    emergencyContact: { type: Number },
    nameEmergencyContact: {type: String},
    gender: { type: String },
    dateBirth: { type: Date, },
    maritalStatus: {type: String},
    zipCode: { type: String },
    state: { type: String },
    city: { type: String },
    district: { type: String },
    street: { type: String },
    number: { type: Number },    
    initialDemand: { type: String, required: true },
    purposeTreatment: { type: String },
    patientEvolution: { type: String },
    generalNotes: { type: String },    
    image: { type: String },
    active: { type: Boolean, required: true},
   },
{ timestamps: true }
);
const Patient = mongoose.model('patient', patientSchema)
module.exports = { Patient, patientSchema }
