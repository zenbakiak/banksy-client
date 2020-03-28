import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav>
      <ul>
        <li style={{float:"left"}}>
          <Link to="/">BanksyApp</Link>

        </li>
        {!props.loggedInStatus && (
          <>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
        <li>
          {props.loggedInStatus && (
            <button className="logout" onClick={props.handleLogout}>
              Log Out
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
