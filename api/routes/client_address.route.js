const express   = require('express')
const router     = express.Router()
const controller =   require('../controller/client_address.controller');
// const auth = require('../middleware/auth');

// Retrieve a single item with id
router.get('/info/:id', controller.getAddress);
router.post('/create', controller.createAddress);
router.post('/update/:id', controller.updateAddress);

router.post('/list/dt', controller.dtDTablesByAddress);


module.exports = router;