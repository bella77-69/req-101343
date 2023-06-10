import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Nav/SideBar";
import Inventory from "./components/Inventory/Inventory";
import InventoryId from "./components/Inventory/InventoryId";
import Home from "./pages/Home/Home";
import Update from "./pages/Update/Update";
import UpdateId from "./pages/Update/UpdateId";

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
          <Route path="/update/:id" exact component={UpdateId} />
          <Route path="/update" exact component={Update} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
