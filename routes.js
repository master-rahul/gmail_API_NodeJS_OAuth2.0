const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/mail/user/:email', controllers.getUser);
router.get('/mail/send', controllers.sendMail);
router.get('/mail/drafts/:email', controllers.getDrafts);
router.get('/mail/read/:messageId', controllers.readMail);
router.get('/mail/feed/:email', controllers.getFeed);
// router.get('/viewMail', controllers.viewMail);
// router.get('/sendMail', controllers.sendMail);

module.exports = router;