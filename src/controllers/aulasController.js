const aulaCtr = {};

aulaCtr.listarAulas = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("ups hubo un error: ",err);
        }
        else{
            conn.query("SELECT * FROM aula",(err,data,next)=>{
                res.render("aulas/aulas",{
                    data
                });
            });
        }
    });
}

aulaCtr.saveAula = (req,res)=>{
    const data = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        conn.query("INSERT INTO aula set ?",[data],(err,aulas)=>{
            if(err || !data){
                console.log("No se pudo agregar por el sgt error: "+err)
                req.flash("error_msg","No se pudo agregar correctamente el registro, verifique todo los registros");
                res.redirect("/aulas");
            }
            else{
                req.flash("success_msg","Aula added Successfully");
                res.redirect("/aulas");
            }
        });
    })
};

aulaCtr.deleteAula = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("Ups hubo un error")
            res.render("aulas/aulas");
        }
        conn.query("DELETE FROM aula WHERE idAula=?",[req.params.id],(err,rows)=>{
            if(err){
                req.flash("error_msg","There is an error here");
            }else{
            req.flash("success_msg","Aula deleted Successfully");
            res.redirect("/aulas");
            }
        });
    });
};

aulaCtr.renderEditAula = (req,res)=>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM aula WHERE idAula = ?",[id],(err,aula)=>{
            if(err){
                console.log(err);
            }
            else{
                res.render("aulas/aulas_edit",{
                    aula : aula[0]
                });
            }
        });
    });
};

aulaCtr.editAula = (req,res)=>{
    const { id } = req.params;
    const newAula = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            req.flash("error_msg","There is an error here");
        }
        else{
            req.flash("success_msg","Aula updated Successfully");
            conn.query("UPDATE aula SET ? WHERE idAula = ?",[newAula,id],(err,rows)=>{
                res.redirect("/aulas");
            });
        }
    });
};


module.exports = aulaCtr;