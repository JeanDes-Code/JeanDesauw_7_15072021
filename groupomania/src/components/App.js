import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

//Assets
import logo from '../assets/icon-left-font-monochrome-black.svg'

//Pages
import Home from "../pages/Home-page"
import Article from "../pages/Article-page"
import ArticlePost from "../pages/ArticlePost"
import Login from "../pages/Login";
import MonCompte from "../pages/MonCompte";

function App() {
  const home =  <FontAwesomeIcon icon={faHome} alt="Home"/>
  const publish = <FontAwesomeIcon icon={faEdit} alt="Publier un article" />
  const user = <FontAwesomeIcon icon={faUser} alt="Mon Compte" />
  const signout = <FontAwesomeIcon icon={faSignOutAlt} alt="Deconnexion" />
  const logout = () => {
    localStorage.clear()
    document.location.reload()
  }
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
            <Link className='nav-item' to='/'> <span className="item-hide">Accueil</span> <span className="nav-item-logo">{home}</span> </Link>
            <Link className='nav-item' to='/post'> <span className="item-hide">Publier</span> <span className="nav-item-logo">{publish}</span> </Link>
            <Link className='nav-item' to='/myAccount'> <span className="item-hide">Compte</span> <span className="nav-item-logo">{user}</span> </Link>
            <button className='nav-item' onClick={logout} > <span className="item-hide">Déconnexion</span> <span className="nav-item-logo">{signout}</span> </button>
          </div>
        </div>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path='/login' exact component={Login} />
          <PrivateRoute path="/post" exact component={ArticlePost} />
          <PrivateRoute path="/myAccount" exact component={MonCompte} />
          <PrivateRoute path="/:id" exact component={Article} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
