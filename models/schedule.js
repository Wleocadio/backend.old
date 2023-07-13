const mongoose = require("mongoose")
//const { Schema } = mongoose;

const scheduleSchema = new mongoose.Schema({
    professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    serviceValue: {type: Number, required: true},
    notes: {type: String},
    vague: {type: Boolean, required:true},
    duration: {type: Number, required: true},
    realized: {type: String},
    consultationObervation: {type: String},
    patientId:{type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},
    patientName: {type: String}
},
{timestamps: true}
);
const Schedule = mongoose.model('schedule', scheduleSchema)
module.exports = {Schedule,scheduleSchema}
