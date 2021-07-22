import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Style
import "../styles/App.css";


//Pages
import Home from "./Home-page"
import Article from "./Article-page"
import ArticlePost from "./ArticlePost"

function App() {
  return (
    <>
      <Router>
        <div className="nav-bar">
          <Link to='/'> Home</Link>
          <Link to='/post'> Publier un article </Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/post" exact component={ArticlePost} />
          <Route path="/:id" exact component={Article} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
