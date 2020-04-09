const anncm = require('express').Router();
const anncmCtrl = require('./anncm.ctrl.js');
const apply = require('./apply');
const upload = require('../../lib/upload');
const middleWareAuth = require('../../middleWare/auth');

anncm.post('/',middleWareAuth, upload.array('file'), anncmCtrl.createAnncm);
anncm.get('/', anncmCtrl.getAnncm);
anncm.put('/',middleWareAuth,upload.array('file'), anncmCtrl.modifyAnncm);
anncm.delete('/',middleWareAuth ,anncmCtrl.deleteAnncm);

anncm.use('/apply',middleWareAuth, apply);

module.exports = anncm;