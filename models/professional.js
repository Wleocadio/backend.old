const mongoose = require("mongoose")
const bcrypty = require ('bcryptjs')

const experienceSchema = new mongoose.Schema({
    formation: {
      type: String,
    },
    status: {
      type: String,
    },
    course: {
      type: String,
    },
    institution: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
  });

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
    image:{ type: Buffer, contentType: String},
    myPlan:{type: String, require:true},
    specialties:[String],
    experience:{type: String},
    formation: {
        type: [experienceSchema],
        validate: {
          validator: function (experiences) {
            return experiences.length <= 7;
          },
          message: 'No máximo 7 experiências são permitidas.',
        },
      },// acertar a esse erro de 7 experiências.
    
    selfDescription:{type: String},
    serviceValue:{type: Number},
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