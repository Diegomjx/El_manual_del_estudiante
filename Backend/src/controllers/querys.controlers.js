import { getConnection, sql } from "../database/connection";

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
        console.error(error);
    }
};

export const addUser = async(req, res) => {
    try{
        const{USUARIO, CONTRASEÑA, NOMBRE, CORREO}=req.body;
        if(USUARIO == null || CONTRASEÑA == null ||  NOMBRE == null || CORREO == null
            || !regex.test(CORREO)
            || CONTRASEÑA.length<5 ){
            return res.json({status:400 , msg: "Bad Reques"});
        
          }
        const pool = await getConnection();
        await pool
        .request()
        .input("USUARIO", sql.VarChar, USUARIO)
        .input("CONTRASEÑA", sql.VarChar, CONTRASEÑA)
        .input("NOMBRE", sql.VarChar, NOMBRE)
        .input("CORREO", sql.VarChar, CORREO)
        .query("INSERT INTO Perfil (USUARIO,CONTRASEÑA,NOMBRE,CORREO) VALUES (@USUARIO,@CONTRASEÑA,@NOMBRE,@CORREO); ");
        return res.json({ status:1, msg: "usuario insertado satisfactoriamente"});
    }catch(error){
        console.error(error);
    }
}

