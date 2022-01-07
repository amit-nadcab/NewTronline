const express = require('express');
const router = express.Router();


const { calculate_levelup_income_from_deposit, get_investorId, cron_reinvest_income, calculate_level_income_from_deposit, calculate_leveldown_income_from_deposit, withdrawal_api, withdrawal_request, set_direct_member, getWalletBalance, check_login_status, get_randomId } = require('../Controller/user');



// router.post('/calculate_levelup_income_from_deposit', calculate_levelup_income_from_deposit);
router.post('/calculate_level_income', calculate_level_income_from_deposit);
router.post('/calculate_levelup_income', calculate_levelup_income_from_deposit);
router.post('/calculate_leveldown_income', calculate_leveldown_income_from_deposit);
router.post('/withdrawal_request', withdrawal_request);
router.post('/get_investorId', get_investorId);
router.post('/get_randomId', get_randomId);
router.post('/set_direct_member', set_direct_member);
router.post('/getWalletBalance', getWalletBalance);
router.post('/check_login_status', check_login_status);
router.post('/withdrawal_api', withdrawal_api);
router.post('/cron_reinvest_income', cron_reinvest_income);

module.exports = router;