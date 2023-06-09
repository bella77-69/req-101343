import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Nav/SideBar";
import Inventory from "./components/Inventory/Inventory";
import InventoryId from "./components/Inventory/InventoryId";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Admin/Dashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import EditInventory from "./components/Edit/EditInventory";

function App() {
  return (
    <Router>
      <>
        <Sidebar />
        <Switch>
          <Route path="/" exact />
          <Route path="/inventory" exact component={Inventory} />
          <Route
            path="/inventory/:id"
            render={(routerProps) => <InventoryId {...routerProps} />}
          />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute
            path="/dashboard/edit/:id"
            exact
            component={EditInventory}
          />
        </Switch>
      </>
    </Router>
  );
}

export default App;
