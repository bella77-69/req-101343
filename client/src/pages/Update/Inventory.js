import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = () => {
    fetch("https://peaceful-tor-21662.herokuapp.com/stock")
      .then((res) => res.json())
      .then((result) => {
        setInventory(result);
      })
      .catch((err) => console.error(err));
  };

  const moreInfo = (id) => {
    window.location.href = `/inventory/${id}`;
  };

  const getSwimLane = (stock) => {
    if (stock < 5) {
      return "Out of Stock";
    } else if (stock < 300) {
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

  inventory.forEach((item) => {
    const swimLane = getSwimLane(item.stock);
    kanbanCategories[swimLane].push(item);
  });

  return (
    <section className="content">
      <div className="container pt-5">
        <h1 className="text-center">Latest Inventory</h1>
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <h2>Available</h2>
            {kanbanCategories["Available"].map((item) => (
              <div className="card" key={item.id}>
                <div className="card-body">
                  <h5 className="card-title">Stock Color: {item.color}</h5>
                  <p className="card-text">Stock Available: {item.stock}</p>
                  <p className="card-text">
                    Status:{" "}
                    <span style={{ color: "green" }}>{"Available"}</span>
                  </p>
                  <button
                    onClick={() => moreInfo(item.id)}
                    className="btn btn-secondary ml-2"
                  >
                    <Link
                      to={{
                        pathname: `/inventory/${item.id}`,
                        state: {
                          categorizeItem: getSwimLane(item.stock),
                        },
                      }}
                      className="card-link"
                    >
                      More Info
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col">
            <h2>Running Low</h2>
            {kanbanCategories["Running Low"].map((item) => (
              <div className="card mb-3" key={item.id}>
                <div className="card-body">
                  <h5 className="card-title">Stock Color: {item.color}</h5>
                  <p className="card-text">Stock Available: {item.stock}</p>
                  <p className="card-text">
                    Status:{" "}
                    <span style={{ color: "orange" }}>{"Running Low"}</span>
                  </p>
                  <button
                    onClick={() => moreInfo(item.id)}
                    className="btn btn-secondary ml-2"
                  >
                    <Link
                      to={{
                        pathname: `/inventory/${item.id}`,
                        state: {
                          categorizeItem: getSwimLane(item.stock),
                        },
                      }}
                      className="card-link"
                    >
                      More Info
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col">
            <h2>Out of Stock</h2>
            {kanbanCategories["Out of Stock"].map((item) => (
              <div className="card mb-3" key={item.id}>
                <div className="card-body">
                  <h5 className="card-title">Stock Color: {item.color}</h5>
                  <p className="card-text">Stock Available: {item.stock}</p>
                  <p className="card-text">
                    Status:{" "}
                    <span style={{ color: "red" }}>{"Out of Stock"}</span>
                  </p>

                  <button
                    onClick={() => moreInfo(item.id)}
                    className="btn btn-secondary ml-2"
                  >
                    <Link
                      to={{
                        pathname: `/inventory/${item.id}`,
                        state: {
                          categorizeItem: getSwimLane(item.stock),
                        },
                      }}
                      className="card-link"
                    >
                      More Info
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Inventory;