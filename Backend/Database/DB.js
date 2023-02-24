const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '192.168.168.28',
    user: 'eftuser',
    password: 'EFT3805325',
    database: 'device_asset'
});

connection.connect((err) => {
    if (!!err) {
        console.log(err);
    } else {
        console.log('Connected...');
    }
  
  });

  module.exports = connection
  
