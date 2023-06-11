import React, { useState, useEffect } from "react";

function InventoryEdit({ match, history }) {
  const id = match.params.id;
  const [stock, setStock] = useState(0);

  useEffect(() => {
    fetch(`https://peaceful-tor-21662.herokuapp.com/stock/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setStock(result.stock);
      })
      .catch((error) => {
        console.log("Error fetching inventory item:", error);
      });
  }, [id]);

  const updateStock = () => {
    fetch(`https://peaceful-tor-21662.herokuapp.com/stock/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        history.push("/inventory");
      })
      .catch((error) => {
        console.log("Error updating inventory item stock:", error);
      });
  };

  return (
    <section className="content">
      <div className="container pt-5">
        <h1 className="text-center">Edit Inventory Item</h1>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">Inventory Item Data</div>
              <div className="card-body">
                <p className="mb-0">Inventory ID: {id}</p>
                <div className="form-group mt-3">
                  <label htmlFor="stock">Stock:</label>
                  <input
                    type="number"
                    id="stock"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value))}
                  />
                </div>
                <button
                  onClick={updateStock}
                  className="btn btn-primary mt-3"
                >
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryEdit;