const AdminModel = require('../models/admin.model');

// get all admin
exports.getAdmin = (req, res) => {
    AdminModel.getAdmin((err, admin) => {
        if (err) {
            res.send(err);
        }
        console.log('getAdmin controller');
        res.send(admin);
    });
}

// get admin by id
exports.getAdminById = (req, res) => {
    AdminModel.getAdminById(req.params.id, (err, admin) => {
        if (err) {
            res.send(err);
        }
        console.log('getAdminById controller');
        res.send(admin);
    });
}

// create new admin
exports.createNewAdmin = (req, res) => {
    const adminReqData = new AdminModel(req.body);
    console.log('createNewAdmin controller');
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        AdminModel.createNewAdmin(adminReqData, (err, admin) => {
            if (err) {
                res.send(err);
            }
            res.json({ status: true, message: 'Admin Created Successfully', data: admin.insertId })
        });
    }
}

// update admin
exports.updateAdmin = (req, res) => {
    const adminReqData = new AdminModel(req.body);
    console.log('updateAdmin controller');
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        AdminModel.updateAdmin(req.params.id, adminReqData, (err, admin) => {
            if (err) {
                res.send(err);
            }
            res.json({ status: true, message: 'Admin updated Successfully' })
        });
    }
}   

// delete admin
exports.deleteAdmin = (req, res) => {
    AdminModel.deleteAdmin(req.params.id, (err, admin) => {
        if (err) {
            res.send(err);
        }
        res.json({ success: true, message: 'Admin deleted successfully!' });
    });
}   

// get admin by email
exports.getAdminByEmail = (req, res) => {
    AdminModel.getAdminByEmail(req.params.email, (err, admin) => {
        if (err) {
            res.send(err);
        }
        console.log('getAdminByEmail controller');
        res.send(admin);
    });
}
 