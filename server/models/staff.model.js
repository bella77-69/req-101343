const dbConn = require("../config/db.config");

const Staff = function (staff) {
    this.name = staff.name;
    this.email = staff.email;
    this.password = staff.password;
    }

Staff.getAllStaff = (result) => {
    dbConn.query("Select * from staff", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("staff : ", res);
                result(null, res);
            }
    });
}

Staff.getStaffById = (id, result) => {
    dbConn.query("Select * from staff where id = ? ", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Staff.createNewStaff = (staffReqData, result) => {
    dbConn.query(
        "INSERT INTO staff SET ?",
        staffReqData,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log('Staff created successfully');
                result(null, res)
            }
        }
    )
}

    

Staff.getStaffByEmail = (email, result) => {
        dbConn.query("Select * from staff where email = ? ", email, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
}




Staff.updateStaff = (id, staff, result) => {
        dbConn.query(
            "UPDATE staff SET name=?,email=?,password=? WHERE id = ?",
            [staff.name, staff.email, staff.password, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            }
        );
}

Staff.deleteStaff = (id, result) => {
        dbConn.query("DELETE FROM staff WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
}

module.exports = Staff;