import React, { useState, useEffect } from "react";

function InventoryId({ match, location }) {
  const [inventory, setInventory] = useState([]);
  const { id } = match.params;
  const categorizeItem = location.state?.categorizeItem;

  useEffect(() => {
    fetch(`https://peaceful-tor-21662.herokuapp.com/${id}`)
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

  const editInventory = (e) => {
    e.preventDefault();
    window.location.href = `/update/${id}`;
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
              <div className="card">
                <div className="card-header swimlane">{categorizeItem}</div>

                <div className="card-body">
                  <p className="mb-0">Id: {item.id}</p>
                  <p className="mb-0">Color: {item.color}</p>
                  <p className="mb-0">Stock: {item.stock}</p>
                  <div className="d-flex justify-content-between">
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
        </div>
      ))}
    </section>
  );
}

export default InventoryId;
