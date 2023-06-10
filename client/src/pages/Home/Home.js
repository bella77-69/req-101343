import React from "react";

const Home = () => {
  return (
    <div className="content">
      <header className="container mt-5 text-center">
        <h1>Welcome to A Paint Company</h1>
        <p>Transforming your spaces with vibrant colors</p>
        <a href="/inventory" className="btn btn-secondary mt-2">
          Paint Inventory
        </a>
      </header>
    </div>
  );
};

export default Home;