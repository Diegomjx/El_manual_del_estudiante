import {getConnection, sql} from "../database"

//-------------------------------------------------------------------------------------------------------------------------------------------
const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const regex_t = /^([0-9]+)$/;
//------------------------------ agregar ------------------------------

export const getUser = async(req, res) => {
    try{
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Perfil');
    res.json(result.recordset);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const addUser = async(req, res) => {
    try{ 
        const{USUARIO, CONTRASEÑA, NOMBRE, CORREO}=req.body;
        if(USUARIO == null || CONTRASEÑA == null ||  NOMBRE == null || CORREO == null
            || !regex.test(CORREO)
            || CONTRASEÑA.length<5 ){
            return res.json({status:400 , msg: "Contraseña o nombre de Usuario incorrecto"});
        
          }

        
        const pool = await getConnection();

        const result =await pool
                    .request()
                    .input("USUARIO", sql.VarChar, USUARIO)
                    .input("CORREO", sql.VarChar, CORREO)
                    .query("SELECT * FROM Perfil WHERE USUARIO = @USUARIO or CORREO = @CORREO;");
        if(result.recordset.length > 0)
        return res.json({ status:0, msg: "NOP"});

        await pool
        .request()
        .input("USUARIO", sql.VarChar, USUARIO)
        .input("CONTRASEÑA", sql.VarChar, CONTRASEÑA)
        .input("NOMBRE", sql.VarChar, NOMBRE)
        .input("CORREO", sql.VarChar, CORREO)
        .query("INSERT INTO Perfil (USUARIO,CONTRASEÑA,NOMBRE,CORREO) VALUES (@USUARIO,@CONTRASEÑA,@NOMBRE,@CORREO); ");
        return res.json({ status:1, msg: "usuario insertado satisfactoriamente"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};


export const getUserByPasswordandUser = async(req, res) =>{
    try{
        const{USUARIO, CONTRASEÑA}=req.body;
        if(USUARIO == null || CONTRASEÑA == null ){
            return res.json({status:400 , msg: "Bad Reques"});
        
          }
        const pool = await getConnection();
        const result =await pool
                    .request()
                    .input("USUARIO", sql.VarChar, USUARIO)
                    .input("CONTRASEÑA", sql.VarChar, CONTRASEÑA)
                    .query("SELECT * FROM Perfil WHERE USUARIO = @USUARIO and CONTRASEÑA = @CONTRASEÑA;");
        if(result.recordset.length > 0)
        return res.json({status:1, msg: "ok", result:result.recordset});
        else
        return res.json({status:0, msg: "Inaceptable"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const delUserById = async(req, res)=>{
    try{
        const{ ID } = req.params;

        const pool = await getConnection();
        const result = await pool
        .request()
        .input("ID",ID)
        .query("DELETE FROM [Manual].[dbo].[Perfil] WHERE ID = @ID");

        if (result.rowsAffected[0] === 0) return res.sendStatus(404);
        return res.sendStatus(204);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const updateUserById = async (req, res) => {
    const { ID,USUARIO, CONTRASEÑA, NOMBRE, CORREO } = req.body;
  
    // validating
    if(USUARIO == null || CONTRASEÑA == null ||  NOMBRE == null || CORREO == null
      || !regex.test(CORREO)
      || CONTRASEÑA.length<5 ) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("USUARIO", sql.VarChar, USUARIO)
        .input("CONTRASEÑA", sql.VarChar, CONTRASEÑA)
        .input("NOMBRE", sql.VarChar, NOMBRE)
        .input("CORREO", sql.VarChar, CORREO)
        .input("ID",ID)
        .query("UPDATE  [Manual].[dbo].[Perfil] SET USUARIO = @USUARIO, CONTRASEÑA = @CONTRASEÑA, NOMBRE = @NOMBRE, CORREO =@CORREO WHERE ID = @ID");
      res.json({ ID,USUARIO, CONTRASEÑA, NOMBRE, CORREO });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };


export const getApuntes = async(req,res)=>{
    try{
      
        const pool = await getConnection();
        const result =await pool
                    .request()
                    .query("SELECT * FROM Apuntes;");
        return res.json({status:1, msg: "almacenados",result:result.recordset});


  }catch(error){
      res.status(500);
      res.send(error.message);
      console.log(error.message);
  }
};

export const getApuntesByIdUser = async(req,res)=>{
  try{
      const {ID} = req.body;
      if(ID == null){
        return res.json({status:0, msg: "no ID"});
      }

      const pool = await getConnection();
      const result =await pool
                  .request()
                  .input("ID", sql.BigInt, ID)
                  .query("SELECT * FROM Apuntes WHERE ID = @ID;");
      return res.json({status:1, msg: "almacenados en user",result:result.recordset});


}catch(error){
    res.status(500);
    res.send(error.message);
}
};

export const getApuntesByIdUserIdPDF = async(req,res)=>{
  try{
      const {ID_PDF} = req.body;
      if(ID_PDF == null  ){
        return res.json({status:0, msg: "no ID's"});
      }

      const pool = await getConnection();
      const result =await pool
                  .request()
                  .input("ID", ID)
                  .input("ID_PDF",  ID_PDF)
                  .query("SELECT * FROM Apuntes WHERE ID_PDF = @ID_PDF;");
      return res.json({status:1, msg: "almacenados en user",result:result.recordset});


}catch(error){
    res.status(500);
    res.send(error.message);
}
};

export const addPDF = async(req, res) => {
  const file = req.file.filename;
  const NAME = req.body.NAME;
  const ID = req.body.ID;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("NOMBRE", sql.VarChar, NAME)
      .input("ID",ID)
      .input("PDF", sql.VarChar, file)
      .query("INSERT INTO Apuntes (ID,NOMBRE,PDF) VALUES (@ID,@NOMBRE,@PDF) ");
      res.json({ status:1, msg: "ok" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  
};



