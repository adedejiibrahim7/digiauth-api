const express = require('express');
// const userRoute = require('./routes/users');
const router = express.Router();
const userController = require('./controllers/user.controller');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use("/user", userRoute);


app.get('/user', userController.index);
app.post('/user/create', userController.signup);
app.post('/user/login', userController.login);

// app.get('/', (req, res)=>{
//     res.send("Hello world");
// });

module.exports = app;