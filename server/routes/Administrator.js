const express = require('express');
const router = express.Router();
const administratorController = require('../controllers/AdministratorController');

router.post('/administrators', administratorController.create);
router.get('/administrators', administratorController.read);
router.put('/administrators/:id', administratorController.update);
router.delete('/administrators/:id', administratorController.delete);

module.exports = router;
