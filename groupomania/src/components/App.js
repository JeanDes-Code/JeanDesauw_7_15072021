import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Style
import "../styles/App.css";

//Assets
import logo from '../assets/icon-left-font-monochrome-black.svg'

//Pages
import Home from "./Home-page"
import Article from "./Article-page"
import ArticlePost from "./ArticlePost"
import Login from "./Login";

function App() {
  return (
    <>
      <Router>
        <div className="header">
          <img className='header-logo' src={logo} alt="Logo Groupomania"></img>
          <div className="nav-bar">
            <Link className='nav-item' to='/'> Page d'accueil </Link>
            <Link className='nav-item' to='/post'> Publier un article </Link>
            <Link className='nav-item' to='/login'> Se connecter </Link>
          </div>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path="/post" exact component={ArticlePost} />
          <Route path="/:id" exact component={Article} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
