import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

// Load local components
import AddPost from ".components/posts";
import Login from ".components/login";
import AdminView from ".components/admin";
import TrackerGraph from "./components/tracker";
import { set } from "mongoose";

function App() {
  // Create a user variable with hooks
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);};
  async function logout(){
    setUser(null);};

  return (
    <div className="App">
      <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">XXXXXXX</a>
        {/* Allow the Admin user to log in */}
        { user ? (
          <a onClick={logout} class='nav-link' style={{cursor:'pointer'}}>
            Logout {user.username}
          </a>
        ) : (
          <Link to={"/login"} className='nav-link' style={{cursor:'pointer'}}>
            Login
          </Link>
        )}
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#">Back to SharePoint</a>
          </li>
        </ul>
      </header>

      <div className='container mt-3'>
        <Switch>
          <Route exact path={["/", "/posts"]} component={Posts} />
        </Switch>
      </div>

    </div>
  );
}

export default App;
