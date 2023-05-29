const express   = require('express')
const router     = express.Router()
const controller =   require('../controller/companies.controller');
// const auth = require('../middleware/auth');

// Retrieve a single item with id
router.get('/info/:id', controller.getCompany);
router.post('/create', controller.createCompany);
router.post('/update/:id', controller.updateCompany);

router.get('/listing', controller.getCompaniesClients);
router.post('/list/dt', controller.dtDTablesByCompany);


module.exports = router;