var { Client,Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ngnotes",
  password: "12345",
  port: 5432
});
//client.connect();

module.exports = {
    db:pool,

    createTable:() =>{
        pool.query('create table noteuser(id serial,name varchar(100))',
        (err,data)=>{

        });
    },
  testConnection: (res,view) => {
    pool.query("Select NOW()", (error, data) => {
        if(error){
            console.log("got error",error);
        }else {
            let rows = data.rows;
            console.log(data.rows);
            res.render(view,{name:'Indresh',add:"Noida",date:data.rows[0]})
        }
        //client.end();
    });
  }
};
