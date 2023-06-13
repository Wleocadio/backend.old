const mongoose = require("mongoose")

async function main() {
    try {
        mongoose.set('strictQuery', true)
        await mongoose
            .connect('mongodb://127.0.0.1:27017/plataformaWeb', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Database Connected'))
            .catch(err => console.log(err));

    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;