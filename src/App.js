import QueryForm from "./components/QueryForm";
import RegisterForm from "./components/RegisterForm";
import Users from "./components/Users";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" exact>
          <RegisterForm />
        </Route>
        <Route exact path="/">
          <QueryForm />
          <Users />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
