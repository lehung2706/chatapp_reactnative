const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:jC9HS6AMDI5QChEB@cluster0.oenaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect sucessfully');
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };
