import React, { useState, useEffect } from "react";

function InventoryId(props) {
  const [inventory, setInventory] = useState([]);
  const { id } = props.match.params;
  const categorizeItem = props.location.state?.categorizeItem;
  console.log(categorizeItem);
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

  return (
    <section className="content">
      <div className="container team py-5">
        <div className="text-center">
          <h1 className="font-bold text-uppercase">Inventory Profile</h1>
        </div>
        <div className="card mt-5">
          {inventory.map((inventory, index) => (
            <div
              className="d-flex flex-column justify-center align-items-center mt-3"
              key={index}
            >
              <h4 className="text-lg lg:text-3xl uppercase">
                {categorizeItem}
              </h4>

              <div className="my-auto d-flex flex-column justify-center align-items-center">
                <h6 className="">Id: {inventory.id}</h6>
                <h5 className="">Color: {inventory.color}</h5>
                <h6 className="">Stock: {inventory.stock}</h6>
              </div>
              <div className="my-auto justify-center">
                <button onClick={(e) => backHome(e)} className="btn mr-3 mt-2">
                  Back to Homepage
                </button>

                <button
                  onClick={(e) => backInventory(e)}
                  className="btn mr-3 mt-2"
                >
                  Back to Inventory
                </button>
              </div>
              <div className="my-auto justify-center"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InventoryId;
