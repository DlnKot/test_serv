const express = require('express');
const app = express();
const port = 3000;
const usersRouter = require('./routes/users');
const User = require('./models/User');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');


//MIDDLEWARESBLOCK
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})
//ENDBLOCK

//ROUTESBLOCK
app.use('/users', usersRouter);
app.use('/auth', authRoutes);
//ENDBLOCK

// PLUG DATA-BASE
sequelize.sync()
    .then(() => console.log('Sync complete'))
    .catch((err) => console.log('Error', err));
// ENDBLOCK




app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
})
