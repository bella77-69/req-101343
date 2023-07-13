import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./inventory.css";

//The InventoryId function component is defined. It receives the match object as a parameter, which contains the URL parameters including the id of the inventory item.
function InventoryId({ match }) {
  const [inventory, setInventory] = useState([]); //inventory to store the details of the inventory item fetched from the API.
  const { id } = match.params;
  const [showModal, setShowModal] = useState(false); 
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");

  //the useEffect hook is used to fetch the details of the inventory item from the API when the component mounts or when the id URL parameter changes. It makes a GET request to the specified API endpoint, converts the response to JSON format, and updates the inventory state variable with the fetched data.
  useEffect(() => {
    fetch(`https://peaceful-tor-21662-7bbc4034299b.herokuapp.com/stock/${id}`)
    // fetch(`http://localhost:5000/stock/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setInventory(result);
      });
  }, [id]);

  //redirects the user to the homepage by setting the window.location.href property.
  const backHome = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  //redirects the user to the inventory page by setting the window.location.href property.
  const backInventory = (e) => {
    e.preventDefault();
    window.location.href = "/inventory";
  };

  // is called when the form inside the modal dialog is submitted. It prevents the default form submission behavior, constructs an object updatedInventory with the updated color and stock values, and makes a PUT request to the API endpoint to update the inventory item. After a successful update, it closes the modal dialog and redirects the user to the inventory page.
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedInventory = { color, stock };
    fetch(`https://peaceful-tor-21662-7bbc4034299b.herokuapp.com/stock/${id}`, {
      // fetch(`http://localhost:5000/stock/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInventory),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        handleCloseModal(); //called to close the modal dialog by setting the showModal state variable to false.
        window.location.href = `/inventory`;
      });
  };

  // called when the "Update Inventory" button is clicked. It opens the modal dialog by calling the handleShowModal function.
  const editInventory = (e) => {
    e.preventDefault();
    handleShowModal();//called to open the modal dialog by setting the showModal state variable to true.
  };

  //The getStockStatusColor function is defined to determine the color code based on the stock status of the inventory item. It retrieves the stock status from the first item in the inventory array and returns a color code based on specific conditions: "red" for stock less than 11 (Out of Stock), "orange" for stock less than 301 (Running Low), and "green" for any other value (Available).
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

// maps over the inventory array and renders the details of the item within a Bootstrap card component. It displays information such as color, stock availability, and status based on the getStockStatusColor function. The "Update Inventory" button triggers the editInventory event handler. Additionally, a modal dialog from react-bootstrap is used to display a form for updating the color and stock values. The modal is controlled by the showModal state variable, and its visibility is toggled by the handleShowModal and handleCloseModal functions.
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
          {/* <p>Update {inventory[0]?.color}</p> */}
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
