const express = require('express');
const passport = require('../middleware/passport');
const { forwardAuthenticated } = require('../middleware/checkAuth');
const authController = require('../controller/auth_controller');
const router = express.Router();

router.get('/register', authController.register);
router.post('/register', authController.registerSubmit);

router.get('/login', forwardAuthenticated, authController.login);
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/reminder/index',
		failureRedirect: '/auth/register'
	})
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/auth/login');
});

module.exports = router;
