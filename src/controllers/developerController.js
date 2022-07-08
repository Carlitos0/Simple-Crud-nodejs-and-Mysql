const developerContr = {};

developerContr.showDevelopers = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("ups hubo un error: ",err);
        }
        else{
            conn.query("SELECT * FROM developer",(err,developers,next)=>{
                if(err){
                    next(err);
                }
                res.render("developer",{
                    developers
                });
            });
        }
    });
};

developerContr.saveDeveloper = (req,res)=>{
    const data = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        conn.query("INSERT INTO developer set ?",[data],(err,developers)=>{
            if(err || !data){
                console.log("No se pudo agregar por el sgt error: "+err)
                req.flash("error_msg","No se pudo agregar correctamente el registro, verifique todo los registros");
                res.redirect("/");
            }
            else{
                req.flash("success_msg","Developer added Successfully");
                res.redirect("/");
            }
        });
    })
};

developerContr.deleteDeveloper = (req,res)=>{
    req.getConnection((err,conn)=>{
        if(err){
            console.log("Ups hubo un error")
            res.render("developer");
        }
        conn.query("DELETE FROM developer WHERE id=?",[req.params.id],(err,rows)=>{
            if(err){
                req.flash("error_msg","There is an error here");
            }else{
            req.flash("success_msg","Developer deleted Successfully");
            res.redirect("/");
            }
        });
    });
};

developerContr.editDeveloper = (req,res)=>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        conn.query("SELECT * FROM developer WHERE id = ?",[id],(err,developer)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(developer);
                res.render("developer_edit",{
                    developer : developer[0]
                });
            }
        });
    });
};

developerContr.edit = (req,res)=>{
    const { id } = req.params;
    const newDeveloper = req.body;
    req.getConnection((err,conn)=>{
        if(err){
            req.flash("error_msg","There is an error here");
        }
        else{
            req.flash("success_msg","Developer updated Successfully");
            conn.query("UPDATE developer SET ? WHERE id = ?",[newDeveloper,id],(err,rows)=>{
                res.redirect("/");
            });
        }
    });
};

module.exports  = developerContr;