const StaffModel = require('../models/staff.model');

// get all staff
exports.getStaff = (req, res) => {
    StaffModel.getAllStaff((err, staff) => {
        if (err) {
            res.send(err);
        }
        console.log('getStaff controller');
        res.send(staff);
    });
}

// get staff by id
exports.getStaffById = (req, res) => {
    StaffModel.getStaffById(req.params.id, (err, staff) => {
        if (err) {
            res.send(err);
        }
        console.log('getStaffById controller');
        res.send(staff);
    });
}

// create new staff
exports.createNewStaff = (req, res) => {
    const staffReqData = new StaffModel(req.body);
    console.log('createNewStaff controller');
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        StaffModel.createNewStaff(staffReqData, (err, staff) => {
            if (err) {
                res.send(err);
            }
            res.json({ status: true, message: 'Staff Created Successfully', data: staff.insertId })
        });
    }
}

// update staff
exports.updateStaff = (req, res) => {
    const staffReqData = new StaffModel(req.body);
    console.log('updateStaff controller');
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        StaffModel.updateStaff(req.params.id, staffReqData, (err, staff) => {
            if (err) {
                res.send(err);
            }
            res.json({ status: true, message: 'Staff updated Successfully' })
        });
    }
}   

// delete staff
exports.deleteStaff = (req, res) => {
    StaffModel.deleteStaff(req.params.id, (err, staff) => {
        if (err) {
            res.send(err);
        }
        res.json({ success: true, message: 'Staff deleted successully!' });
    });
}   

// get staff by email
exports.getStaffByEmail = (req, res) => {
    StaffModel.getStaffByEmail(req.params.email, (err, staff) => {
        if (err) {
            res.send(err);
        }
        console.log('getStaffByEmail controller');
        res.send(staff);
    });
}
 