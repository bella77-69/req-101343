import React, { useState, useEffect } from "react";
import axios from "axios";

function Staff() {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetchInventory();
    }, []);
  
    const fetchInventory = () => {
      axios.get("http://localhost:5000/stock").then((response) => {
        const items = response.data;
        setItems(items);
      });
    };
  
    const markAsRunningLow = (itemId) => {
      axios
        .put(`http://localhost:5000/stock/${itemId}`, { runningLow: true })
        .then((res) => {
          console.log(res);
          fetchInventory();
        //   alertAdmin();
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    // const alertAdmin = () => {
    //   axios
    //     .put(`http://localhost:5000/alert`)
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // };
  
    return (
      <div className="content">
        <h1 className="text-center">Staff Page</h1>
  
        {items.map((item) => (
          <div key={item.id} className="card my-4">
            <div className="card-body">
              <h5 className="card-title">{item.color}</h5>
              <p className="card-text">Stock: {item.stock}</p>
              <p className="card-text">
                Status: {item.runningLow ? "Running Low" : "Available"}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => markAsRunningLow(item.id)}
                disabled={item.runningLow}
              >
                Mark as Running Low
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  export default Staff;