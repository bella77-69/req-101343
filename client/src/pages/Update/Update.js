// // import React, { useState, useEffect } from "react";

// // function Update() {
// //   const [inventory, setInventory] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:5000/stock")
// //       .then((res) => res.json())
// //       .then((result) => {
// //         setInventory(result);
// //       });
// //   }, []);

// //   const editInventory = (id) => {
// //     window.location.href = `/update/${id}`;
// //   };

// //   const markRunningLow = (id) => {
// //     fetch(`http://localhost:5000/stock/${id}`, {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ runningLow: true }),
// //     })
// //       .then((res) => res.json())
// //       .then((result) => {
// //         console.log(result)
// //         const updatedInventory = inventory.map((item) => {
// //           if (item.id === id) {
// //             return { ...item, runningLow: true };
// //           }
// //           return item;
// //         });
// //         setInventory(updatedInventory);
// //       })
// //       .catch((error) => {
// //         console.log("Error marking inventory item as running low:", error);
// //       });
// //   };

// //   return (
// //     <section className="content">
// //       <div className="container pt-5">
// //         <h1 className="text-center">Paint Update</h1>

// //         <div className="d-flex justify-content-center align-items-center mt-5">
// //           <div className="col-md-6 col-sm-12">
// //             <div className="card">
// //               <div className="card-header">Inventory Data</div>

// //               {inventory.map((item) => (
// //                 <div className="card-body" key={item.id}>
// //                   <p className="mb-0">Id: {item.id}</p>
// //                   <p className="mb-0">Color: {item.color}</p>
// //                   <p className="mb-0">Stock: {item.stock}</p>
// //                   {item.runningLow ? (
// //                     <p className="text-danger">Running Low</p>
// //                   ) : (
// //                     <button
// //                       onClick={() => markRunningLow(item.id)}
// //                       className="btn btn-secondary mt-2 mr-2"
// //                     >
// //                       Mark as Running Low
// //                     </button>
// //                   )}
// //                   <div className="d-flex justify-content-between">
// //                     <button
// //                       onClick={() => editInventory(item.id)}
// //                       className="btn btn-secondary mt-2 mr-2"
// //                     >
// //                       Edit Inventory
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // export default Update;

// import React, { useState, useEffect } from "react";

// function Update() {
//   const [inventory, setInventory] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/stock")
//       .then((res) => res.json())
//       .then((result) => {
//         setInventory(result);
//       });
//   }, []);

//   const editInventory = (id) => {
//     window.location.href = `/update/${id}`;
//   };

//   const markRunningLow = (id) => {
//     fetch(`http://localhost:5000/stock/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ runningLow: true }),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         const updatedInventory = inventory.map((item) => {
//           if (item.id === id) {
//             return { ...item, runningLow: true };
//           }
//           return item;
//         });
//         setInventory(updatedInventory);
//       })
//       .catch((error) => {
//         console.log("Error marking inventory item as running low:", error);
//       });
//   };

//   const getSwimLane = (stock) => {
//     if (stock < 5) {
//       return "Out of Stock";
//     } else if (stock < 300) {
//       return "Running Low";
//     } else {
//       return "Available";
//     }
//   };

//   return (
//     <section className="content">
//       <div className="container pt-5">
//         <h1 className="text-center">Paint Update</h1>

//         <div className="d-flex justify-content-center align-items-center mt-5">
//           <div className="col-md-6 col-sm-12">
//             <div className="card">
//               <div className="card-header">Inventory Data</div>

//               {inventory.map((item) => (
//                 <div className="card-body" key={item.id}>
//                   <p className="mb-0">Id: {item.id}</p>
//                   <p className="mb-0">Color: {item.color}</p>
//                   <p className="mb-0">Stock: {item.stock}</p>
//                   <p className="mb-0">Swim Lane: {getSwimLane(item.stock)}</p>
//                   {item.runningLow ? (
//                     <p className="text-danger">Running Low</p>
//                   ) : (
//                     <button
//                       onClick={() => markRunningLow(item.id)}
//                       className="btn btn-secondary mt-2 mr-2"
//                     >
//                       Mark as Running Low
//                     </button>
//                   )}
//                   <div className="d-flex justify-content-between">
//                     <button
//                       onClick={() => editInventory(item.id)}
//                       className="btn btn-secondary mt-2 mr-2"
//                     >
//                       Edit Inventory
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Update;

import React, { useState, useEffect } from "react";

function Update() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stock")
      .then((res) => res.json())
      .then((result) => {
        setInventory(result);
      });
  }, []);

  const editInventory = (id) => {
    window.location.href = `/update/${id}`;
  };

  // const markRunningLow = (id) => {
  //   fetch(`http://localhost:5000/stock/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ runningLow: true }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       const updatedInventory = inventory.map((item) => {
  //         if (item.id === id) {
  //           return { ...item, runningLow: true };
  //         }
  //         return item;
  //       });
  //       setInventory(updatedInventory);
  //     })
  //     .catch((error) => {
  //       console.log("Error marking inventory item as running low:", error);
  //     });
  // };

  const getSwimLane = (stock) => {
    if (stock < 5) {
      return "Out of Stock";
    } else if (stock < 300) {
      return "Running Low";
    } else {
      return "Available";
    }
  };

  return (
    <section className="content">
      <div className="container pt-5">
        <h1 className="text-center">Paint Update</h1>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">Inventory Data</div>

              {inventory.map((item) => (
                <div className="card-body" key={item.id}>
                  <p className="mb-0">Id: {item.id}</p>
                  <p className="mb-0">Color: {item.color}</p>
                  <p className="mb-0">Stock: {item.stock}</p>
                  <p className="mb-0 swimlane">Swim Lane: {getSwimLane(item.stock)}</p>
                  {/* {item.runningLow ? (
                    <p className="text-danger">Running Low</p>
                  ) : (
                    <button
                      onClick={() => markRunningLow(item.id)}
                      className="btn btn-secondary mt-2 mr-2"
                    >
                      Mark as Running Low
                    </button>
                  )} */}
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => editInventory(item.id)}
                      className="btn btn-secondary mt-2 mr-2"
                    >
                      Edit Inventory
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

export default Update;