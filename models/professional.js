const mongoose = require("mongoose")
const bcrypty = require ('bcryptjs')

const professionalSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    profession:{ type: String, required: true },
    professionRegister:{ type: Number, required: true },
    cpf:{ type: Number, unique:true, required: true },
    cnpj:{ type: Number,unique:true},
    mail:{ type: String, unique:true, required: true , loewrcase: true},
    password:{ type: String, required: true},
    phone:{ type: Number, required: true },
    gender:{ type: String},
    birth:{ type: String, required: true },
    zipCode:{ type: String, required: true },
    state:{ type: String, required: true },
    city:{ type: String, required: true },
    street:{ type: String, required: true },
    number:{ type: Number, required: true },
    district:{ type: String, required: true },
    image:{ type: String},
    loginAttempts: {type: Number},
    isBlocked:{type: Boolean, required: true}
},
{timestamps: true}
);

//Criptografa o password
professionalSchema.pre('save', async function(next){
    const hash = await bcrypty.hash(this.password, 10);
    this.password = hash
    next();
})

const Professional = mongoose.model('professional', professionalSchema)
module.exports = { Professional, professionalSchema};