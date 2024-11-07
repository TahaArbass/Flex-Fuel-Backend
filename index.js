const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/user.route'));
app.use('/api/muscle-groups', require('./routes/muscleGroup.route'));
app.use('/api/muscles', require('./routes/muscle.route'));


// Error handler
const errorHandler = require('./utils/errors/errorHandler');
app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});