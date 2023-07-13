import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  //The fetchInventory function is defined to make a network request to the specified API endpoint. It fetches the data, converts the response to JSON format, and updates the inventory state using the setInventory function from the useState hook.
  const fetchInventory = () => {
    fetch(`https://peaceful-tor-21662-7bbc4034299b.herokuapp.com/stock`)
    // fetch(`http://localhost:5000/stock`)
      .then((res) => res.json())
      .then((result) => {
        setInventory(result);
      })
      .catch((err) => console.error(err));
  };

  const moreInfo = (id) => {
    window.location.href = `/inventory/${id}`;
  };

//The getSwimLane function is defined to categorize inventory items into swim lanes based on their stock availability. It takes the stock parameter and uses conditional statements to determine the swim lane category. The function returns the appropriate category as a string: "Out of Stock" if stock is less than 11, "Running Low" if stock is less than 301, and "Available" for any other value.
  const getSwimLane = (stock) => {
    if (stock < 11) {
      return "Out of Stock";
    } else if (stock < 301) {
      return "Running Low";
    } else {
      return "Available";
    }
  };

//The kanbanCategories object is defined to store the inventory items categorized by swim lanes. It has three properties: "Available", "Running Low", and "Out of Stock". Each property is initialized with an empty array []. The object will be used to store the inventory items in the appropriate swim lane category.
  const kanbanCategories = {
    Available: [],
    "Running Low": [],
    "Out of Stock": [],
  };

 //The inventory.forEach loop iterates over each item in the inventory array. For each item, it calls the getSwimLane function with the item.stock as an argument to determine the swim lane category. The item is then pushed into the corresponding array within the kanbanCategories object using the swim lane as the key.
  inventory.forEach((item) => {
    const swimLane = getSwimLane(item.stock);
    kanbanCategories[swimLane].push(item);
  });

  //The return statement displays the items within each swim lane category by mapping over the arrays within the kanbanCategories object. Each item is rendered as a Bootstrap card with information such as color, stock availability, and status. Clicking the "More Info" button or link navigates to a specific inventory item's page using React Router's Link component. The item's id is passed as a URL parameter and the item's swim lane category is passed as state.
  return (
    <section className="content">
      <div className="container pt-5">
        <h1 className="text-center">Latest Inventory</h1>
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <h2 className="text-center">Available</h2>
            {kanbanCategories["Available"].map((item) => (
              <div className="card mb-3" key={item.id}>
                <div className="card-body">
                  <h5 className="card-title">Stock Color: {item.color}</h5>
                  <p className="card-text">Stock Available: {item.stock}</p>
                  <p className="card-text">
                    Status:{" "}
                    <span className="text-success bold-text">Available</span>
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
          <div className="col-md-4 mb-4">
            <h2 className="text-center">Running Low</h2>
            {kanbanCategories["Running Low"].map((item) => (
              <div className="card mb-3" key={item.id}>
                <div className="card-body">
                  <h5 className="card-title">Stock Color: {item.color}</h5>
                  <p className="card-text">Stock Available: {item.stock}</p>
                  <p className="card-text">
                    Status:{" "}
                    <span className="text-warning bold-text">Running Low</span>
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
          <div className="col-md-4 mb-4">
            <h2 className="text-center">Out of Stock</h2>
            {kanbanCategories["Out of Stock"].map((item) => (
              <div className="card mb-3" key={item.id}>
                <div className="card-body">
                  <h5 className="card-title">Stock Color: {item.color}</h5>
                  <p className="card-text">Stock Available: {item.stock}</p>
                  <p className="card-text">
                    Status:{" "}
                    <span className="text-danger bold-text">Out of Stock</span>
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
