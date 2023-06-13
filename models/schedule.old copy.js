const mongoose = require("mongoose")

const scheduleSchema = new mongoose.Schema({
    hour:{ type: String},
    day:{ type: String},
    month:{ type: String},
    year:{ type: String},
    hourBusy:{ type: Boolean},
 
},
{timestamps: true}
);
const Schedule = mongoose.model('schedule', scheduleSchema)
module.exports = Schedule