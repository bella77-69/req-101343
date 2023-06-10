const dbConn = require("../config/db.config");

const Admin = function (admin) {
  this.email = admin.email;
  this.password = admin.password;
};

Admin.getAdmin = (result) => {
  dbConn.query("Select * from admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("staff : ", res);
      result(null, res);
    }
  });
};

Admin.getAdminById = (id, result) => {
  dbConn.query("Select * from admin where id = ? ", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Admin.createNewAdmin = (adminReqData, result) => {
  dbConn.query("INSERT INTO admin SET ?", adminReqData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("Admin created successfully");
      result(null, res);
    }
  });
};

Admin.getAdminByEmail = (email, result) => {
  dbConn.query("Select * from admin where email = ? ", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Admin.updateAdmin = (id, admin, result) => {
  dbConn.query(
    "UPDATE admin SET email=?,password=? WHERE id = ?",
    [admin.email, admin.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Admin.deleteAdmin = (id, result) => {
  dbConn.query("DELETE FROM admin WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Admin;