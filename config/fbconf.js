var options = {};

options.host = '127.0.0.1';
options.port = 3050;
options.database = 'C:/DEV/Firebird/test.fdb';
options.user = 'SYSDBA';
options.password = 'masterkey';
options.lowercase_keys = false;
options.role = null;           
options.pageSize = 4096;       

module.exports = options;
