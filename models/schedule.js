const mongoose = require("mongoose")
//const { Schema } = mongoose;

const scheduleSchema = new mongoose.Schema({
    professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    observation: {type: String},
    vague: {type: Boolean, required:true},
    patientId:{type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: false}
},
{timestamps: true}
);
const Schedule = mongoose.model('schedule', scheduleSchema)
module.exports = {Schedule,scheduleSchema}
