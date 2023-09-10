const mongoose = require('mongoose');
const mongoDB_Url = process.env.MongoDB_Url;

mongoose.connect(mongoDB_Url, {
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting db: ' + err);
})