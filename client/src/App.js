import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Nav/SideBar";
import InventoryId from "./components/Inventory/InventoryId";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Update/Inventory";

function App() {
  return (
    <Router>
      <>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/inventory" exact component={Inventory} />
          <Route
            path="/inventory/:id"
            render={(routerProps) => <InventoryId {...routerProps} />}
          />
        </Switch>
      </>
    </Router>
  );
}

export default App;
