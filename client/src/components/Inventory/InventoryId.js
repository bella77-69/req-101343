import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./inventory.css";

function InventoryId({ match }) {
  const [inventory, setInventory] = useState([]);
  const { id } = match.params;
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetch(`https://peaceful-tor-21662.herokuapp.com/stock/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setInventory(result);
      });
  }, [id]);

  const backHome = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const backInventory = (e) => {
    e.preventDefault();
    window.location.href = "/inventory";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedInventory = { color, stock };
    fetch(`https://peaceful-tor-21662.herokuapp.com/stock/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInventory),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        handleCloseModal();
        window.location.href = `/inventory`;
      });
  };

  const editInventory = (e) => {
    e.preventDefault();
    handleShowModal();
  };

  const getStockStatusColor = () => {
    const stockStatus = inventory[0]?.stock;

    if (stockStatus < 11) {
      return "red"; // Out of Stock
    } else if (stockStatus < 301) {
      return "orange"; // Running Low
    } else {
      return "green"; // Available
    }
  };

  return (
    <section className="content">
      {inventory.map((item, index) => (
        <div className="container pt-5" key={item.id}>
          <h1 className="text-center">{item.color} Stock Status</h1>
          <div className="text-center">
            <button
              onClick={(e) => backHome(e)}
              className="btn btn-secondary mt-2 mr-2"
            >
              Back to Homepage
            </button>

            <button
              onClick={(e) => backInventory(e)}
              className="btn btn-secondary mt-2"
            >
              Back to Inventory
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="col-md-6 col-sm-12">
              <div className="card text-center">
                <div className="card-header">
                  <h5 className="card-title">Stock Color: {item.color}</h5>
                  <p className="card-text">Stock Available: {item.stock}</p>
                  <p className="card-text">
                    Status:{" "}
                    <span
                      className="bold-text"
                      style={{ color: getStockStatusColor() }}
                    >
                      {item.stock < 11
                        ? "Out of Stock"
                        : item.stock < 301
                        ? "Running Low"
                        : "Available"}
                    </span>
                  </p>
                  <button
                    onClick={(e) => editInventory(e)}
                    className="btn btn-secondary mt-2 mr-2"
                  >
                    Update Inventory
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Update {inventory[0]?.color}</p>
          <p>Current Stock: {inventory[0]?.stock}</p>
          <p className="font-italic">
            Paint will be updated automatically to 'Running Low' when inventory
            falls below 300, and updated to 'Out of Stock' when inventory falls
            below 10
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                className="form-control"
                id="color"
                placeholder="Enter color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                placeholder="Enter stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default InventoryId;
