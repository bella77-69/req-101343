import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateId({ match }) {
  const [inventory, setInventory] = useState({});
  const [initialInventory, setInitialInventory] = useState({});
  const [inventoryRunningLow, setInventoryRunningLow] = useState(false);
  const { id } = match.params;

  useEffect(() => {
    fetch(`http://localhost:5000/stock/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setInventory(result);
        setInitialInventory(result);
      });
  }, [id]);

  const updateInventory = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/stock/${id}`, {
        ...inventory,
        runningLow: inventoryRunningLow,
      })
      .then((res) => {
        console.log(res);
        window.location.href = `/inventory `;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRunningLowChange = (e) => {
    setInventoryRunningLow(e.target.checked);
  };

  const isValueChanged = (field) => {
    return inventory[field] !== initialInventory[field];
  };

  return (
    <section className="content">
      <div className="container pt-5">
        <h1 className="text-center">Edit Inventory</h1>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={updateInventory}>
                  <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <input
                      type="text"
                      className={`form-control ${
                        isValueChanged("color") ? "changed-value" : ""
                      }`}
                      id="color"
                      name="color"
                      value={inventory.color || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input
                      type="number"
                      className={`form-control ${
                        isValueChanged("stock") ? "changed-value" : ""
                      }`}
                      id="stock"
                      name="stock"
                      value={inventory.stock || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="runningLow"
                        name="runningLow"
                        checked={inventoryRunningLow}
                        onChange={handleRunningLowChange}
                      />
                      <label className="form-check-label" htmlFor="runningLow">
                        Running Low
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-secondary mt-2">
                    Update Inventory
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateId;
