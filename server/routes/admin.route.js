const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

// get all admin
router.get('/', adminController.getAdmin);

// get admin by ID
router.get('/:id', adminController.getAdminById);

// get admin by email 
router.get('/admin/:email', adminController.getAdminByEmail);

// create new admin
router.post('/', adminController.createNewAdmin);

// update admin
router.put('/:id', adminController.updateAdmin);

// delete admin
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;