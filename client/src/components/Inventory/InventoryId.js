import React, { useState, useEffect } from "react";

function InventoryId({ match, location }) {
  const [inventory, setInventory] = useState([]);
  const { id } = match.params;
  const categorizeItem = location.state?.categorizeItem;

  useEffect(() => {
    fetch(`http://localhost:5000/stock/${id}`)
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
    // window.location.href = `edit/${id}`;
    window.location.href = `/dashboard/edit/${id}`;
  };

  return (
    <section className="content">
      <div className="container pt-5">
        <h1 className="text-center">Inventory Profile</h1>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">{categorizeItem}</div>

              {inventory.map((item, index) => (
                <div className="card-body" key={item.id}>
                  <p className="mb-0">Id: {item.id}</p>
                  <p className="mb-0">Color: {item.color}</p>
                  <p className="mb-0">Stock: {item.stock}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={(e) => editInventory(e)}
                      className="btn btn-sm mt-2 mr-2"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={(e) => backHome(e)}
                      className="btn btn-sm mt-2 mr-2"
                    >
                      Back to Homepage
                    </button>

                    <button
                      onClick={(e) => backInventory(e)}
                      className="btn btn-sm mt-2"
                    >
                      Back to Inventory
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryId;
