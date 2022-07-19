const alumnosCtr = {};


alumnosCtr.listarAlumnos = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("ups hubo un error: ",err);
        }
        else{
            conn.query("SELECT * FROM alumno",(err,data,next)=>{
                res.render("alumnos/alumnos",{
                    data
                });
            });
        }
    });
};

alumnosCtr.saveAlumno = (req,res)=>{
    const data = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        conn.query("INSERT INTO alumno set ?",[data],(err,alumnos)=>{
            if(err || !data){
                console.log("No se pudo agregar por el sgt error: "+err)
                req.flash("error_msg","No se pudo agregar correctamente el registro, verifique todo los registros");
                res.redirect("/alumnos");
            }
            else{
                req.flash("success_msg","Alumno added Successfully");
                res.redirect("/alumnos");
            }
        });
    })
};

alumnosCtr.deleteAlumno = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("Ups hubo un error")
            res.render("alumnos");
        }
        conn.query("DELETE FROM alumno WHERE idAlumno=?",[req.params.id],(err,rows)=>{
            if(err){
                req.flash("error_msg","There is an error here");
            }else{
            req.flash("success_msg","Alumno deleted Successfully");
            res.redirect("/alumnos");
            }
        });
    });
};

alumnosCtr.renderEditAlumno = (req,res)=>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM alumno WHERE idAlumno = ?",[id],(err,alumno)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(alumno);
                res.render("alumnos/alumnos_edit",{
                    alumno : alumno[0]
                });
            }
        });
    });
};

alumnosCtr.editAlumno = (req,res)=>{
    const { id } = req.params;
    const newAlumno = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            req.flash("error_msg","There is an error here");
        }
        else{
            req.flash("success_msg","Alumno updated Successfully");
            conn.query("UPDATE alumno SET ? WHERE idAlumno = ?",[newAlumno,id],(err,rows)=>{
                res.redirect("/alumnos/");
            });
        }
    });
};

module.exports = alumnosCtr;