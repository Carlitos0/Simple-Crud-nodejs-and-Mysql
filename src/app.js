const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mysql = require("mysql");
const myconnection = require("express-myconnection");
const { urlencoded } = require("express");

// Initialization
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);//PUERTO DE SERVIDOR
app.set("view engine","ejs");// CONFIGURAMOS EL MOTOR DE PLANTILLA
app.set("views",path.join(__dirname,"views")); //LA DIRECCION DE LA CARPETA VIEWS

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(morgan("dev")); // PARA VER POR CONSOLA LAS RUTAS QUE VISITAMOS
//CONECCION A LA BASE DE DATOS
app.use(myconnection(mysql, {
    host:"localhost",
    user:"root",
    password:"",
    port:3306,
    database: "nodejs_crud_mysql"
},"single"));


// Routes
app.use(require("./routes/developer.routes"));

// Static Files
app.use(express.static(path.join(__dirname,"public")));

module.exports = app;