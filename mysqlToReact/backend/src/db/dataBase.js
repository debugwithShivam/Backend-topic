import mysql from 'mysql2';


const db = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'newpassword',
    database:'auth_user',
    port:'3306'
})

db.connect((err) => {
    if (err) {
        console.log("DB Error:", err);
        return;
    }
    console.log("MySQL Connected");
});

export default db;