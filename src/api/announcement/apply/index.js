const apply = require('express').Router();
const applyCtrl = require('./apply.ctrl');

apply.post('/', applyCtrl.applyAnncm);
// apply.delete('/', applyCtrl.cancelApply);
// apply.get('/', applyCtrl.getApplyList);

module.exports = apply;