const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');
const path = require('path');
const app = express();

// Env setting
require('dotenv').config();
// db setting
require('./config/db');

app.use(express.json());
app.use(cors());
app.use('/', apiRoutes);

// static file
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})