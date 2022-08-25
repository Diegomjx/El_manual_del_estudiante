import sql from 'mssql'

const dbSettings = {
    user: 'manual',
    password: 'password',
    server: '127.0.0.1',
    database: 'Manual',
    pert: '1433', 
    options: {
        encrypt:true,
        trustServerCertificate: true,
    },
}
async function getConnection(){
const pool = await sql.connect(dbSettings);
const result = await pool.request().query('SELECT 1');
console.log(result);
}

getConnection();