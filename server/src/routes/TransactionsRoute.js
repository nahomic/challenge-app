const express = require('express');
const { Transaction } = require('sequelize');
const router = express.Router();

const Transaction = require('../migrations/20210124004340-create-transaction')

router.get('/list',Transaction.list);

module.exports = router;