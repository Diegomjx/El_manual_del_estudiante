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

export const addList = async(req, res) => {
  try{ 

    const NOMBRE = req.body.NOMBRE;
    const ID = req.body.ID;
    console.log(NOMBRE);
      if(ID == null ||  NOMBRE == null ){
          return res.json({status:400 , msg: "DATOS FALTANTES"});
      
        }

      
      const pool = await getConnection();

      const result =await pool
                  .request()
                  .input("NOMBRE", sql.VarChar, NOMBRE)
                  .query("SELECT * FROM Lista WHERE NOMBRE = @NOMBRE;");
      if(result.recordset.length > 0)
      return res.json({ status:0, msg: "List name is taken"});

      await pool
      .request()
      .input("ID", sql.BigInt, ID)
      .input("NOMBRE", sql.VarChar, NOMBRE)
      .query("INSERT INTO Lista (ID,NOMBRE) VALUES (@ID,@NOMBRE); ");
      return res.json({ status:1, msg: "ok"});
  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};





export const getExistInList = async(req, res)=>{
  try{
    const {ID_LISTA,ID,ID_PDF} = req.body;
    if(ID == null || ID_LISTA == null  || ID_PDF == null){
      return res.json({status:0, msg: "no ID"});
    }

    const pool = await getConnection();
    const result =await pool
                .request()
                .input("ID_PDF", sql.BigInt, ID_PDF)
                .input("ID", sql.BigInt, ID)
                .input("ID_LISTA", sql.BigInt, ID_LISTA)
                .query("SELECT CASE WHEN EXISTS ( SELECT * FROM Lista L , ListaContieneApuntes LCA  WHERE L.ID = @ID and L.ID_LISTA = LCA.ID_LISTA and LCA.ID_PDF = @ID_PDF and L.ID_LISTA = @ID_LISTA ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS bool  ");
    return res.json({status:1, msg: "ok",result:result.recordset});


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
      const{ID} = req.body;
      
        const pool = await getConnection();
        const result =await pool
                    .request()
                    .input("ID", sql.BigInt, ID)
                    .query("SELECT A.* , IIF(M.ID is null, 'false', 'true')  Megusta FROM Apuntes A LEFT OUTER JOIN MeGusta M ON M.ID_PDF = A.ID_PDF and M.ID = @ID WHERE APRUBE = 1 ORDER BY A.fecha DESC;");
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
                  .query("SELECT A.* , IIF(M.ID is null, 'false', 'true')  Megusta FROM Apuntes A  LEFT OUTER JOIN MeGusta M ON M.ID_PDF = A.ID_PDF and M.ID = @ID WHERE A.ID = @ID ORDER BY A.fecha DESC;");
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
                  .query("SELECT * FROM Apuntes WHERE ID_PDF = @ID_PDF ORDER BY fecha DESC;");
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
      .query("INSERT INTO Apuntes (ID,NOMBRE,PDF,APRUBE) VALUES (@ID,@NOMBRE,@PDF,1) ");
      res.json({ status:1, msg: "ok" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  
};


export const createList = async(req, res) => {
  const NAME = req.body.NAME;
  const ID = req.body.ID;
  try {

    if(ID == null ||   NOMBRE == null  )
      {
        return res.json({status:400 , msg: "Falta nombre"});
      }
      
    const pool = await getConnection();
    await pool
      .request()
      .input("NOMBRE", sql.VarChar, NAME)
      .input("ID",ID)
      .query("INSERT INTO Lista (ID,NOMBRE) VALUES (@ID,@NOMBRE) ");
      res.json({ status:1, msg: "ok" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  
};


export const InsertIntoList = async(req, res) => {
  const NAME = req.body.NAME;
  const ID = req.body.ID;
  try {

    if(ID == null ||   NOMBRE == null  )
      {
        return res.json({status:400 , msg: "Falta nombre"});
      }
      
    const pool = await getConnection();
    await pool
      .request()
      .input("NOMBRE", sql.VarChar, NAME)
      .input("ID",ID)
      .query("INSERT INTO List (ID,NOMBRE) VALUES (@ID,@NOMBRE) ");
      res.json({ status:1, msg: "ok" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  
};

export const getListById = async(req, res)=>{
  try{
    const {ID} = req.body;
    if(ID == null){
      return res.json({status:0, msg: "no ID"});
    }

    const pool = await getConnection();
    const result =await pool
                .request()
                .input("ID", sql.BigInt, ID)
                .query("SELECT * FROM Lista WHERE ID = @ID;");
    return res.json({status:1, msg: "ok",result:result.recordset});


}catch(error){
  res.status(500);
  res.send(error.message);
}
};


export const getListByIdandID_PDF = async(req, res)=>{
  try{
    const {ID,ID_PDF} = req.body;
    if(ID == null || ID_PDF == null ){
      return res.json({status:0, msg: "no ID"});
    }

    const pool = await getConnection();
    const result =await pool
                .request()
                .input("ID", sql.BigInt, ID)
                .input("ID_PDF", sql.BigInt, ID_PDF)
                .query("SELECT L.ID_LISTA, l.NOMBRE, IIF(la.id_lista is null, 'false', 'true')  boolean FROM Lista L left outer join ListaContieneApuntes la on l.ID_LISTA = la.ID_LISTA  and la.ID_PDF = @ID_PDF WHERE L.ID = @ID ;");
    return res.json({status:1, msg: "ok",result:result.recordset});


}catch(error){
  res.status(500);
  res.send(error.message);
}
};


export const addPDFtoList = async(req, res) => {
  try{ 

    const ID_LISTA = req.body.ID_LISTA;
    const ID_PDF = req.body.ID_PDF;
    if(ID_LISTA == null ||  ID_PDF == null ||
      ID_LISTA == '' ||  ID_PDF == '' ){
          return res.json({status:400 , msg: "DATOS FALTANTES"});
      
        }

      
      const pool = await getConnection();

      const result =await pool
                  .request()
                  .input("ID_LISTA", sql.BigInt, ID_LISTA)
                  .input("ID_PDF", sql.BigInt, ID_PDF)
                  .query("SELECT * FROM ListaContieneApuntes WHERE ID_PDF = @ID_PDF and ID_LISTA = @ID_LISTA ;");
      if(result.recordset.length > 0)
      return res.json({ status:0, msg: "List have PDF"});

      await pool
      .request()
      .input("ID_LISTA", sql.BigInt, ID_LISTA)
      .input("ID_PDF", sql.BigInt, ID_PDF)
      .query("INSERT INTO ListaContieneApuntes (ID_LISTA,ID_PDF) VALUES (@ID_LISTA,@ID_PDF); ");
      return res.json({ status:1, msg: "ok"});
  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};

export const dellPDFtoList = async(req, res) => {
  try{ 

    const ID_LISTA = req.body.ID_LISTA;
    const ID_PDF = req.body.ID_PDF;
      if(ID_LISTA == null ||  ID_PDF == null ||
         ID_LISTA == '' ||  ID_PDF == '' ){
          return res.json({status:400 , msg: "DATOS FALTANTES"});
      
        }

      
      const pool = await getConnection();

      const result =await pool
                  .request()
                  .input("ID_LISTA", sql.BigInt, ID_LISTA)
                  .input("ID_PDF", sql.BigInt, ID_PDF)
                  .query("SELECT * FROM ListaContieneApuntes WHERE ID_PDF = @ID_PDF and ID_LISTA = @ID_LISTA ;");
      if(result.recordset.length <= 0)
      return res.json({ status:0, msg: "Does Exist"});

      await pool
      .request()
      .input("ID_LISTA", sql.BigInt, ID_LISTA)
      .input("ID_PDF", sql.BigInt, ID_PDF)
      .query("DELETE FROM [Manual].[dbo].[ListaContieneApuntes] WHERE ID_PDF = @ID_PDF and ID_LISTA = @ID_LISTA ;");
      return res.json({ status:1, msg: "ok"});
  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};


export const getPDFsdelasListas = async(req, res)=>{
  try{
    const {ID_LISTA,ID} = req.body;
    if(ID_LISTA == null || ID == null){
      return res.json({status:0, msg: "no ID"});
    }

    const pool = await getConnection();
    const result =await pool
                .request()
                .input("ID_LISTA", sql.BigInt, ID_LISTA)
                .input("ID", sql.BigInt, ID)
                .query("Select A.* , IIF(M.ID is null, 'false', 'true')  Megusta  from ListaContieneApuntes LCA, Apuntes A LEFT OUTER JOIN MeGusta M ON M.ID_PDF = A.ID_PDF and M.ID = @ID   where LCA.ID_PDF = A.ID_PDF and LCA.ID_LISTA =@ID_LISTA   ORDER BY LCA.fecha DESC");
    return res.json({status:1, msg: "ok",result:result.recordset});
}catch(error){
  res.status(500);
  res.send(error.message);
}
};

export const addPDFalHistorial = async(req, res) => {
  try{ 

    const ID = req.body.ID;
    const ID_PDF = req.body.ID_PDF;
      if(ID == null ||  ID_PDF == null ||
        ID == '' ||  ID_PDF == '' ){
          return res.json({status:400 , msg: "DATOS FALTANTES"});
      
        }

      
      const pool = await getConnection();

      await pool
                  .request()
                  .input("ID", sql.BigInt, ID)
                  .input("ID_PDF", sql.BigInt, ID_PDF)
                  .query("DELETE FROM [Manual].[dbo].[Historial] WHERE ID_PDF = @ID_PDF and ID = @ID;");

      await pool
      .request()
      .input("ID", sql.BigInt, ID)
      .input("ID_PDF", sql.BigInt, ID_PDF)
      .query("INSERT INTO Historial (ID,ID_PDF) VALUES (@ID,@ID_PDF);  ");
      return res.json({ status:1, msg: "ok"});
  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};



export const getPDFalHistorial = async(req, res) => {
  try{ 

    const ID = req.body.ID;
      if(ID == null ||
         ID == ''  ){
          return res.json({status:400 , msg: "DATOS FALTANTES"});
      
        }

      
      const pool = await getConnection();

      const result = await pool
      .request()
      .input("ID", sql.BigInt, ID)
      .query("SELECT A.* , IIF(M.ID is null, 'false', 'true')  Megusta FROM  Historial h, Apuntes A LEFT OUTER JOIN MeGusta M ON M.ID_PDF = A.ID_PDF and A.ID = @ID WHERE h.ID_PDF = A.ID_PDF and h.ID =@ID ORDER BY h.fecha DESC;");
      return res.json({ status:1, msg: "ok",result:result.recordset });
  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};

export const addPDFalMegusta = async(req, res) => {
  try{ 

    const ID = req.body.ID;
    const ID_PDF = req.body.ID_PDF;
      if(ID == null ||  ID_PDF == null ||
        ID == '' ||  ID_PDF == '' ){
          return res.json({status:400 , msg: "DATOS FALTANTES"});
      
        }

      
      const pool = await getConnection();

      await pool
                  .request()
                  .input("ID", sql.BigInt, ID)
                  .input("ID_PDF", sql.BigInt, ID_PDF)
                  .query("DELETE FROM [Manual].[dbo].[MeGusta] WHERE ID_PDF = @ID_PDF and ID = @ID;");

      await pool
      .request()
      .input("ID", sql.BigInt, ID)
      .input("ID_PDF", sql.BigInt, ID_PDF)
      .query("INSERT INTO MeGusta (ID,ID_PDF) VALUES (@ID,@ID_PDF);  ");
      return res.json({ status:1, msg: "ok"});
  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};



export const getPDFalMeGusta = async(req, res) => {
  try{ 

    const ID = req.body.ID;
      if(ID == null ||
         ID == ''  ){
          return res.json({status:400 , msg: "DATOS FALTANTES"});
      
        }

      
      const pool = await getConnection();

      const result = await pool
      .request()
      .input("ID", sql.BigInt, ID)
      .query("SELECT A.* , IIF(M.ID is null, 'false', 'true')  Megusta FROM   Apuntes A LEFT OUTER JOIN MeGusta M ON M.ID_PDF = A.ID_PDF and A.ID = @ID WHERE M.ID_PDF = A.ID_PDF and M.ID =@ID ORDER BY M.fecha DESC;");
      return res.json({ status:1, msg: "ok",result:result.recordset });
  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};


export const dellPDFalMegusta = async(req, res) => {
  try{ 

    const ID = req.body.ID;
    const ID_PDF = req.body.ID_PDF;
      if(ID == null ||  ID_PDF == null ||
        ID == '' ||  ID_PDF == '' ){
          return res.json({status:400 , msg: "DATOS FALTANTES"});
      
        }

      
      const pool = await getConnection();

      await pool
                  .request()
                  .input("ID", sql.BigInt, ID)
                  .input("ID_PDF", sql.BigInt, ID_PDF)
                  .query("DELETE FROM [Manual].[dbo].[MeGusta] WHERE ID_PDF = @ID_PDF and ID = @ID;");
      return res.json({ status:1, msg: "ok"});
  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};

