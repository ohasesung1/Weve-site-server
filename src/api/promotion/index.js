const promotion = require('express').Router();
const promotionCtrl = require('./promotion.ctrl');
const upload = require('../../lib/upload');

promotion.post('/',upload.array('file'), promotionCtrl.writeTeamPromotion);


module.exports = promotion;