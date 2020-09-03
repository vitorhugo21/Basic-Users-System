const { Router } = require('express');
const { getUser, getUsers } = require('../controllers/userController');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/users', requireAuth, getUsers)
router.get('/users/:id', requireAuth, getUser);

module.exports = router;
