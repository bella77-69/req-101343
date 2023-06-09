import React, { Component } from "react";
import axios from "axios";
import { logout, isLogin } from "../../Utils/index";

class Dashboard extends Component {
  state = {
    items: [],
    isLogin: isLogin(),
  };

  handleLogout = () => {
    logout();
    this.setState({
      isLogin: false,
    });
    window.location.href = `/`;
  };

  addStock = (e) => {
    e.preventDefault();
    window.location.href = `/dashboard/add-stock`;
  };

  login = (e) => {
    e.preventDefault();
    window.location.href = `/login`;
  };

  addStaff = (e) => {
    e.preventDefault();
    window.location.href = `/dashboard/add-staff`;
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/stock/`).then((response) => {
      const items = response.data;
      this.setState({ items });
    });
  }

  deleteRow(id, e) {
    e.preventDefault();
    axios.delete(`http://localhost:5000/stock/${id}`).then((response) => {
      console.log(response.data);

      const items = this.state.items.filter((item) => item.id !== id);
      this.setState({ items });
      window.location.href = `/dashboard`;
    });
  }

  editRow(id, e) {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/stock/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          currentInventoryId: response.data[0],
        });
        window.location.href = `/dashboard/edit/${id}`;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="content">
        <h2 className="h2 text-center mb-4 mt-3 mx-2">Admin Dashboard</h2>
        <div className="container mt-3">
          <button
            className="btn btn-primary"
            onClick={() => this.handleLogout()}
          >
            Click here to log out
          </button>
        </div>

        <div className="container mt-3">
          <button onClick={(e) => this.login(e)} className="btn btn-primary">
            Go to Login in page
          </button>
        </div>
        <div className="container mt-3">
          <button onClick={(e) => this.addStock(e)} className="btn btn-primary">
            Add Stock
          </button>
        </div>

        <div className="container">
          <div className="row mx-4 ">
            <h2 className="h2 text-center mb-4 mt-3 ">Inventory</h2>
          </div>
          <table className="table table-striped table-responsive mx-4">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Color</th>
                <th scope="col">Stock</th>
                <th scope="col">Available</th>
                <th scope="col">Running Low</th>
                <th scope="col">Out Of Stock</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>

            <tbody>
              {this.state.items.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.color}</td>
                  <td>{item.stock}</td>
                  <td>{item.available}</td>
                  <td>{item.runningLow}</td>
                  <td>{item.outOfStock}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={(e) => this.editRow(item.id, e)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => this.deleteRow(item.id, e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dashboard;
