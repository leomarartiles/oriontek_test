const express   = require('express')
const router     = express.Router()
const controller =   require('../controller/companies.controller');
// const auth = require('../middleware/auth');

// Retrieve a single item with id
//  router.post('/auth', controller.findByEmail);
// router.get('/attr', controller.getAppFieldData);
router.get('/info/:id', controller.getCompany);

// router.post('/users/auth', controller.findByEmail); 


module.exports = router;