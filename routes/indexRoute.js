const express = require('express');
const remindersController = require('../controller/reminder_controller');
const friendsController = require('../controller/friends_controller');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/checkAuth');

router.get('/friends', ensureAuthenticated, friendsController.list);
router.post('/friend/', ensureAuthenticated, friendsController.add);
router.post('/friend/delete/:id', ensureAuthenticated, friendsController.delete);

router.get('/reminders', ensureAuthenticated, remindersController.list);
router.get('/reminder/new', ensureAuthenticated, remindersController.new);
router.get('/reminder/:id', ensureAuthenticated, remindersController.listOne);
router.get('/reminder/:id/edit', ensureAuthenticated, remindersController.edit);
router.post('/reminder/', ensureAuthenticated, remindersController.create);
router.post('/reminder/update/:id', ensureAuthenticated, remindersController.update);
router.post('/reminder/delete/:id', ensureAuthenticated, remindersController.delete);

module.exports = router;
