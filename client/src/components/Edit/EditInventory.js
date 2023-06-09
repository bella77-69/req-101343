import React, { useState, useRef, useEffect } from "react";

function EditInventory(props) {
  const [stock, setStock] = useState([]);
  const edit_id = useRef(null);
  const edit_color = useRef(null);
  const edit_stock = useRef(null);
  const edit_available = useRef(null);
  const edit_runningLow = useRef(null);
  const edit_outOfStock = useRef(null);
  const [editResult, setEditResult] = useState(null);
  const { id } = props.match.params;

  useEffect((id) => {
    fetch(`http://localhost:5000/stock/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setStock(result);
        console.log(result);
      });
  }, []);

  console.log(stock);

  const handleEdit = (e) => {
    e.preventDefault();
    const data = {
      id: edit_id.current.value,
      color: edit_color.current.value,
      stock: edit_stock.current.value,
      available: edit_available.current.value,
      runningLow: edit_runningLow.current.value,
      outOfStock: edit_outOfStock.current.value,
    };
    fetch(`http://localhost:5000/stock/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setEditResult(result);
      });
    window.location.href = `/dashboard`;
  };

  const clearPutOutput = (e) => {
    e.preventDefault();
    setEditResult(null);
    console.log(editResult);
  };

  const backToDashboard = (e) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  return (
    <div className="content">
      <h2>Admin Dashboard</h2>
      <button onClick={(e) => backToDashboard(e)} className="btn btn-primary">
        Back to Admin Dashboard
      </button>
      <div className="text-center mt-5">
        <h2 className="font-bold text-uppercase mt-2">Update Inventory</h2>
      </div>
      <div className="card-body ">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={edit_id}
            placeholder="Id"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={edit_color}
            placeholder="Color"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={edit_stock}
            placeholder="Stock"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={edit_available}
            placeholder="Available"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={edit_runningLow}
            placeholder="Running Low"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={edit_outOfStock}
            placeholder="Out Of Stock"
          />
        </div>
        <button className="btn btn-sm btn-primary" onClick={handleEdit}>
          Update Data
        </button>

        <button
          className="btn btn-sm btn-warning ml-2"
          onClick={clearPutOutput}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default EditInventory;
