import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";


function App() {
  return (
  <Router>
    <>
    <Nav />
    <Switch>
      <Route path="/" exact />
    </Switch>
</>
  </Router>
  );
}

export default App;
