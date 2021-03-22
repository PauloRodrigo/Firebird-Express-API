'use strict';

const Firebird = require('node-firebird');
const options = require('./Config/fbconf');
const basicAuth = require('express-basic-auth');

exports.myAuthorizer = async (username, password, cb) => {
    try {
        Firebird.attach(options, function(err,db){
            if(err){
                return cb(null,false);
            }
    
            const qry = `SELECT * FROM USUARIOS 
                         WHERE (NOME  = '`+username+`') 
                           AND (SENHA = '`+password+`') `;
           
            db.query(qry, function(err,vals){
                if(err){
                    return cb(null,false);        
                }
                if(vals.length > 0){
                    var userMatches = basicAuth.safeCompare(username, vals[0]['NOME']);
                    var passwordMatches = basicAuth.safeCompare(password, vals[0]['SENHA']);
                    var userAuthorized = userMatches & passwordMatches ? true : false;
                    return cb(null,userAuthorized);
                } else {
                    return cb(null,false);       
                }
            })            
        });    

    } catch (error) {
        return cb(null,false);          
    }
}
