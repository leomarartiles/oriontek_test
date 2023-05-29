const express   = require('express')
const router     = express.Router()
const controller =   require('../controller/users.controller');
// // const auth = require('../middleware/auth');



router.post('/auth', controller.userLogin);
// router.post('/login',controller.doLoginToken);
// router.post('/logout',controller.doLoginLogout);



//  router.get('/v2/me',auth.ensureAuthenticated, controller.getUserLoginMe);
// router.get('/me',auth.ensureAuthenticated, controller.getUserLoginMe);
// router.post('/list/dt', controller.doDTablesUsersByCompany);

router.post('/create', controller.createUserLogin); 


module.exports = router;