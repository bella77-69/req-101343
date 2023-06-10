import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const Inventory = ({ match }) => {
  const [inventory, setInventory] = useState([]);
  const [currentInventory, setCurrentInventory] = useState({});

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    const id = match.params.id || inventory[0]?.id;
    if (id && id !== currentInventory.id) {
      fetchInventoryItem(id);
    }
  }, [match.params.id, currentInventory.id, inventory]);

  const fetchInventory = () => {
    fetch("http://localhost:5000/stock")
      .then((res) => res.json())
      .then((data) => {
        setInventory(data);
      })
      .catch((err) => console.error(err));
  };

  const fetchInventoryItem = (id) => {
    axios
      .get(`http://localhost:5000/stock/${id}`)
      .then((res) => {
        setCurrentInventory(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleDetails = (id, e) => {
    e.preventDefault();
    fetchInventoryItem(id);
    window.location.href = `/inventory/${id}`;
  };

  const editRow = (id, e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/stock/${id}`)
      .then((response) => {
        console.log(response.data);
        setCurrentInventory(response.data[0]);
        window.location.href = `update/${id}`;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSwimLane = (item) => {
    if (item.stock < 5) {
      return "Out of Stock";
    } else if (item.stock < 300) {
      return "Running Low";
    } else {
      return "Available";
    }
  };

  const kanbanCategories = {
    Available: [],
    "Running Low": [],
    "Out of Stock": [],
  };

  inventory.forEach((inventoryItem) => {
    const category = getSwimLane(inventoryItem);
    kanbanCategories[category].push(inventoryItem);
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
                  {items.map((inventoryItem) => (
                    <div className="card" key={inventoryItem.id}>
                      <div className="card-body">
                        <p className="mb-0">Color: {inventoryItem.color}</p>
                        <p className="mb-0">Stock: {inventoryItem.stock}</p>
                        <div>
                          <button
                            className="btn btn-secondary mt-2"
                            onClick={(e) => handleDetails(inventoryItem.id, e)}
                          >
                            <Link
                              to={{
                                pathname: `/inventory/${inventoryItem.id}`,
                                state: {
                                  categorizeItem: getSwimLane(inventoryItem),
                                },
                              }}
                              className="card-link"
                            >
                              More Info
                            </Link>
                          </button>
                        </div>
                        <div>
                          <button
                            className="btn btn-secondary mt-2"
                            onClick={(e) => editRow(inventoryItem.id, e)}
                          >
                            Edit/Update
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
};

export default withRouter(Inventory);
