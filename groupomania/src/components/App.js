import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Style
import "../styles/App.css";


//Pages
import Home from "./Home-page"

function App() {
  return (
  <>
      <Router>
        <Switch>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
  </>
  );
}

export default App;
