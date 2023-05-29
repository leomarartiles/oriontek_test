const express   = require('express')
const router     = express.Router()
const controller =   require('../controller/clients.controller');
// const auth = require('../middleware/auth');

// Retrieve a single item with id
router.get('/info/:id', controller.getClient);
router.post('/create', controller.createClient);
router.post('/update/:id', controller.updateClient);

router.post('/list/dt', controller.dtDTablesByClients);


module.exports = router;