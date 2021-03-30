'use strict';

var Firebird = require('node-firebird');
const options = require('../Config/fbconf');

exports.get = (req, res, next) =>{
    Firebird.attach(options,function(err,db){
        if(err){
            return res.status(400).send(err);
        }
        
        db.query('SELECT * FROM PRODUTOS', function(err,vals){
            if(err){
                return res.status(400).send(err);
            }
            return res.status(200).send(vals);
        });
    });
};

exports.getByID = (req, res, next) =>{
    Firebird.attach(options,function(err,db){
        if(err){
            return res.status(400).send(err);
        }
        const id = req.params.id;

        db.query('SELECT * FROM PRODUTOS where ID = '+id, function(err,vals){
            if(err){
                return res.status(400).send(err);
            }
            return res.status(200).send(vals);
        });
    });
};

exports.getByName = (req, res, next) =>{
    Firebird.attach(options,function(err,db){
        if(err){
            return res.status(400).send(err);
        }
        const name = `'%`+req.params.name+`%'`;
        const qry = 'SELECT * FROM PRODUTOS where (DESCRICAO LIKE '+name+')';

        db.query(qry, function(err,vals){
            if(err){
                return res.status(400).send({message: 'Falha ao encontrar produto', data: err});
            }
            return res.status(200).send(vals);
        });
    });
};

exports.post =  (req, res, next) =>{
    Firebird.attach(options,function(err,db){
        if(err){
            return res.status(400).send(err);
        }

        const pName = `'`+req.body.name+`'`;
        const pBalance = req.body.balance;
        const pPrice = req.body.price;

        const qry = 'INSERT INTO PRODUTOS (ID,DESCRICAO,SALDO,VENDA) '+
                    'VALUES ( (SELECT MAX(ID)+1 FROM PRODUTOS), '+pName+', '+pBalance+', '+pPrice+' )';
        
        db.query(qry, function(err,vals){
            if(err){
                return res.status(400).send({message: 'Falha ao cadastrar produto - '+qry, data: err});
            }
            return res.status(201).send({message: 'Produto cadastrado!'});
        });
    });
};
