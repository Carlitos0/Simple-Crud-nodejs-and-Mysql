const notasCtr = {} 

notasCtr.listarNotas = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("ups hubo un error: ",err);
        }
        else{
            conn.query("SELECT n.idNota, a.nombres as idAlumno ,c.curso as idCurso ,au.aula as idAula,d.nombres as idDocente, n.practicas,n.parcial,n.final FROM notas N INNER Join alumno A on n.idAlumno = a.idAlumno INNER Join curso C on n.idCurso = c.idCurso INNER Join aula AU on n.idAula = au.idAula INNER Join docente D on n.idDocente = d.idDocente order by n.idNota",(err,data,next)=>{
                res.render("notas/notas",{
                    data
                });
            });
        }
    });
}

notasCtr.verAlumnos = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err)
        }
        else{
            conn.query("SELECT DISTINCT idAlumno from alumno",(err,datos)=>{
                res.render("notas/notas",{datos_codigo:datos})
            });
        }
    });
}

notasCtr.saveNota = (req,res)=>{
    const data = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        conn.query("INSERT INTO notas set ?",[data],(err,notas)=>{
            if(err || !data){
                console.log("No se pudo agregar por el sgt error: "+err)
                req.flash("error_msg","No se pudo agregar correctamente el registro, verifique todo los registros");
                res.redirect("/notas");
            }
            else{
                req.flash("success_msg","Notas added Successfully");
                res.redirect("/notas");
            }
        });
    })
};

notasCtr.renderEditNota = (req,res)=>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM notas WHERE idNota = ?",[id],(err,nota)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(nota);
                res.render("notas/notas_edit",{
                    nota : nota[0]
                });
            }
        });
    });
};

notasCtr.editNota = (req,res)=>{
    const { id } = req.params;
    const newNota = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            req.flash("error_msg","There is an error here");
        }
        else{
            req.flash("success_msg","Nota updated Successfully");
            conn.query("UPDATE notas SET ? WHERE idNota = ?",[newNota,id],(err,rows)=>{
                res.redirect("/notas/");
            });
        }
    });
};

notasCtr.deleteNotas = (req,res)=>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        else{
            conn.query("DELETE FROM notas where idNota = ?",[id],(err,donde)=>{
                res.redirect("/notas");
            })
        }
    });
}

module.exports = notasCtr;
