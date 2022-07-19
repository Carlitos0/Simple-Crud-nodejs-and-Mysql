const docenteCtr = {};

docenteCtr.listarDocentes = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("ups hubo un error: ",err);
        }
        else{
            conn.query("SELECT * FROM docente",(err,data,next)=>{
                res.render("docentes/docentes",{
                    data
                });
            });
        }
    });
};

docenteCtr.saveDocente = (req,res)=>{
    const data = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        conn.query("INSERT INTO docente set ?",[data],(err,docentes)=>{
            if(err || !data){
                console.log("No se pudo agregar por el sgt error: "+err)
                req.flash("error_msg","No se pudo agregar correctamente el registro, verifique todo los registros");
                res.redirect("/docentes");
            }
            else{
                req.flash("success_msg","Docente added Successfully");
                res.redirect("/docentes");
            }
        });
    })
};

docenteCtr.deleteDocente = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("Ups hubo un error")
            res.render("docentes/docentes");
        }
        conn.query("DELETE FROM docente WHERE idDocente=?",[req.params.id],(err,rows)=>{
            if(err){
                req.flash("error_msg","There is an error here");
            }else{
            req.flash("success_msg","Docente deleted Successfully");
            res.redirect("/docentes");
            }
        });
    });
};

docenteCtr.renderEditDocente = (req,res)=>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM docente WHERE idDocente = ?",[id],(err,docente)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(docente);
                res.render("docentes/docentes_edit",{
                    docente : docente[0]
                });
            }
        });
    });
};

docenteCtr.editDocente = (req,res)=>{
    const { id } = req.params;
    const newDocente = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            req.flash("error_msg","There is an error here");
        }
        else{
            req.flash("success_msg","Docente updated Successfully");
            conn.query("UPDATE docente SET ? WHERE idDocente = ?",[newDocente,id],(err,rows)=>{
                res.redirect("/docentes/");
            });
        }
    });
};

module.exports = docenteCtr;