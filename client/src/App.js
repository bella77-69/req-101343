import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Nav/SideBar";
import Inventory from "./components/Inventory/Inventory";
import InventoryId from "./components/Inventory/InventoryId";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Admin/Dashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import EditInventory from "./components/Edit/EditInventory";
import Home from "./pages/Home/Home";
import Staff from "./pages/Staff/Staff";
import { isAuthenticated } from "./services/auth";

function App() {
  return (
    <Router>
      <>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/inventory" exact component={Inventory} />
          <Route
            path="/inventory/:id"
            render={(routerProps) => <InventoryId {...routerProps} />}
          />
          <Route path="/edit/:id" exact component={Staff} />
          <Route path="/staff" exact component={Staff} />

          <PrivateRoute
            path="/dashboard"
            exact
            component={Dashboard}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/dashboard/edit/:id"
            exact
            component={EditInventory}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </>
    </Router>
  );
}

export default App;