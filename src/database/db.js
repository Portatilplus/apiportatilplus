import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config();


const pool = createPool({
    host:process.env.MYSQLHOST,
    user:process.env.MYSQLUSER,
    password:process.env.MYSQLPASSWORD,
    port:process.env.MYSQLPORT,
    database:process.env.MYSQLDATABASE,
});


export default pool;