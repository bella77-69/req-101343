const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staff.controller");

// get all staff
router.get("/", staffController.getStaff);

// get staff by ID
router.get("/:id", staffController.getStaffById);

// get staff by email
router.get("/email/:email", staffController.getStaffByEmail);

// create new staff
router.post("/", staffController.createNewStaff);

// update staff
router.put("/:id", staffController.updateStaff);

// delete staff
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
