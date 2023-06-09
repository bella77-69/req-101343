import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Inventory extends Component {
  state = {
    inventory: [],
    currentInventory: {},
    staff: [],
    admin: [],
  };

  componentDidMount = () => {
    fetch("http://localhost:5000/stock")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          inventory: data,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidUpdate = () => {
    const id = this.props.match.params.id
      ? this.props.match.params.id
      : this.state.inventory[0].id;
    if (id !== this.state.currentInventory.id) {
      axios
        .get(`http://localhost:5000/stock/${id}`)
        .then((res) => {
          this.setState({
            currentInventory: res.data[0],
            staff: res.data,
            admin: res.data,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  handleSubmit = (id, e) => {
    e.preventDefault(id);
    axios
      .get(`http://localhost:5000/stock/${id}`)
      .then((res) => {
        console.log(res);
        this.setState({
          currentInventory: res.data[0],
        });
        window.location.href = `/inventory/${id}`;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  categorizeItem = (item) => {
    if (item.stock < 1) {
      return "Out of Stock";
    } else if (item.stock < 500) {
      return "Running Low";
    } else {
      return "Available";
    }
  };

  render() {
    return (
      <div className="content">
        <div className="container mt-5">
          <h1 className="text-center">Inventory</h1>
          <div className="row">
            {this.state.inventory.map((inventory, index) => (
              <div className="col-md-2 col-md-6 col-lg-4 mb-4" key={index}>
                <div className="card">
                  <div className="card-body px-2 pb-2 pt-1">
                    <div className="d-flex mb-3 justify-content-between">
                      <div>
                        <p className="mb-0">Id:</p>
                        <p className="mb-0">Color:</p>
                        <p className="mb-0">Stock:</p>
                        <p className="mb-0 text-danger">
                          {this.categorizeItem(inventory)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="mb-0">
                          <b>{inventory.id}</b>
                        </p>
                        <p className="mb-0">
                          <b>{inventory.color}</b>
                        </p>
                        <p className="mb-0">
                          <b>{inventory.stock}</b>
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="col px-0">
                        <button
                          className="btn mr-3 mt-2 border-dark"
                          onClick={(e) => this.handleSubmit(inventory.id, e)}
                        >
                          <Link
                            to={{
                              pathname: `/inventory/${inventory.id}`,
                              state: {
                                categorizeItem: this.categorizeItem(inventory),
                              },
                            }}
                            className="card-link"
                          >
                            More Info
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;
