import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

//Style
import "../styles/App.css";

//Assets
import logo from '../assets/icon-left-font-monochrome-black.svg'

//Pages
import Home from "../pages/Home-page"
import Article from "../pages/Article-page"
import ArticlePost from "../pages/ArticlePost"
import Login from "../pages/Login";

function App() {
  
  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const isAuth = () => getWithExpiry("token");
  getWithExpiry("userId");

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        return isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
 
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
          <PrivateRoute path="/" exact component={Home} />
          <Route path='/login' exact component={Login} />
          <PrivateRoute path="/post" exact component={ArticlePost} />
          <PrivateRoute path="/:id" exact component={Article} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
