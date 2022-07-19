const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mysql = require("mysql");
const flash = require("connect-flash");
const session = require("express-session");
const myconnection = require("express-myconnection");

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
    database: "db_sistemas_notas"
},"single"));
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}));
app.use(flash());

// Global Variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

// Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/alumnos.routes"));
app.use(require("./routes/cursos.routes"));
app.use(require("./routes/aulas.routes"));
app.use(require("./routes/docentes.routes"));
app.use(require("./routes/notas.routes"));

// Static Files
app.use(express.static(path.join(__dirname,"public")));

module.exports = app;