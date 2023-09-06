let PORT = 8080 || process.env.PORT;
const express = require('express');
let jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require('mongoose')
const helmet = require("helmet")
// imports controllers
const login = require('./controllers/login.controller');
const appointments = require('./controllers/appointments.controller');
//impots express
const app = express();
// use cors
app.use(cors())
//use helmet
app.use(helmet())
//use express.json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const url =
	"mongodb+srv://chellamans:Chellamans2004@cluster.yk51olc.mongodb.net/?retryWrites=true&w=majority";
// connects to database
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
// logs error if one occurs when connecting to database
mongoose.connection.on("error", function () {
	console.log("Could not connect to the database. Exiting now...");
	process.exit();
});
// runs if database is successfully connected to
mongoose.connection.once("open", function () {
	console.log("Successfully connected to the database!");
});

// login routes
app.post('/login/create-default-admin', login.createDefaultAdminAccount)
app.post('/login/admin-login', login.loginAdminAccount)
app.post('/login/create-new-admin', login.createNewAdmin)

// appointments routes
app.post('/app/add-appointment', appointments.createNewAppointment)
app.get('/app/admin-appointments', appointments.findAllAppointments)
app.put('/app/edit-appointment', appointments.updateById)
app.delete('/app/delete-appointment', appointments.deleteById)
app.get('/app/user-appointments', appointments.findUserAppointments)

//launches port
app.listen(PORT, () => {
	console.log("Application up and running on port: " + PORT);
});
