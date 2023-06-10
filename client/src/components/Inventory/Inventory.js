import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Inventory extends Component {
  state = {
    inventory: [],
    currentInventory: {},
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
    const id = this.props.match.params.id || this.state.inventory[0]?.id;
    if (id && id !== this.state.currentInventory.id) {
      axios
        .get(`http://localhost:5000/stock/${id}`)
        .then((res) => {
          this.setState({
            currentInventory: res.data[0],
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

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      currentInventory: {
        ...prevState.currentInventory,
        [name]: value,
      },
    }));
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

  updateInventory = (e) => {
    e.preventDefault();
    const { currentInventory } = this.state;
    const id = currentInventory.id;
    axios
      .put(`http://localhost:5000/stock/${id}`, currentInventory)
      .then((res) => {
        console.log(res);
        this.props.history.push("/inventory");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  render() {
    const kanbanCategories = {
      Available: [],
      "Running Low": [],
      "Out of Stock": [],
    };

    this.state.inventory.forEach((inventory) => {
      const category = this.categorizeItem(inventory);
      kanbanCategories[category].push(inventory);
    });

    return (
      <div className="content">
        <div className="container mt-5">
          <h1 className="text-center">Inventory</h1>
          <div className="row mt-5">
            {Object.entries(kanbanCategories).map(([category, items]) => (
              <div className="col-md-4 mb-4" key={category}>
                <div className="card">
                  <div className="card-header">{category}</div>
                  <div className="card-body">
                    {items.map((inventory, index) => (
                      <div className="card" key={index}>
                        <div className="card-body">
                          <p className="mb-0">Color: {inventory.color}</p>
                          <p className="mb-0">Stock: {inventory.stock}</p>
                          <div>
                            <button
                              className="btn btn-sm mt-2"
                              onClick={(e) =>
                                this.handleSubmit(inventory.id, e)
                              }
                            >
                              <Link
                                to={{
                                  pathname: `/inventory/${inventory.id}`,
                                  state: {
                                    categorizeItem:
                                      this.categorizeItem(inventory),
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
                    ))}
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

export default withRouter(Inventory);
