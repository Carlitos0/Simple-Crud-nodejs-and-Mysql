const cursoCtrl = {};

cursoCtrl.ListarCursos = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("ups hubo un error: ",err);
        }
        else{
            conn.query("SELECT * FROM curso",(err,data,next)=>{
                res.render("cursos/cursos",{
                    data
                });
            });
        }
    });
}

cursoCtrl.saveCurso = (req,res)=>{
    const data = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        conn.query("INSERT INTO curso set ?",[data],(err,cursos)=>{
            if(err || !data){
                console.log("No se pudo agregar por el sgt error: "+err)
                req.flash("error_msg","No se pudo agregar correctamente el registro, verifique todo los registros");
                res.redirect("/cursos");
            }
            else{
                req.flash("success_msg","Curso added Successfully");
                res.redirect("/cursos");
            }
        });
    })
};

cursoCtrl.deleteCurso = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("Ups hubo un error")
            res.render("cursos/cursos");
        }
        conn.query("DELETE FROM curso WHERE idCurso=?",[req.params.id],(err,rows)=>{
            if(err){
                req.flash("error_msg","There is an error here");
            }else{
            req.flash("success_msg","Curso deleted Successfully");
            res.redirect("/cursos");
            }
        });
    });
};

cursoCtrl.renderEditCurso = (req,res)=>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM curso WHERE idCurso = ?",[id],(err,curso)=>{
            if(err){
                console.log(err);
            }
            else{
                res.render("cursos/cursos_edit",{
                    curso : curso[0]
                });
            }
        });
    });
};

cursoCtrl.editCurso = (req,res)=>{
    const { id } = req.params;
    const newCurso = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            req.flash("error_msg","There is an error here");
        }
        else{
            req.flash("success_msg","Curso updated Successfully");
            conn.query("UPDATE curso SET ? WHERE idCurso = ?",[newCurso,id],(err,rows)=>{
                res.redirect("/cursos");
            });
        }
    });
};

module.exports = cursoCtrl;