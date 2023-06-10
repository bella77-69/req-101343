import React from "react";

const Home = () => {
  return (
    <div className="content">
      <header className="container mt-5">
        <h1 className="text-center">Welcome to A Paint Company</h1>
        <p className="text-center">Transforming your spaces with vibrant colors</p>
        <a href="/inventory" className="btn btn-primary">
          Paint Inventory
        </a>
      </header>
    </div>
  );
};

export default Home;