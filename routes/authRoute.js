const { Router } = require('express');
const { validateRegister, validateLogin } = require('../middlewares/user.middleware');
const { register, logout, login } = require('../controllers/authController');

const router = Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.get('/logout', logout);

module.exports = router;
