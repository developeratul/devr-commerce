import { useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const burgerIconRef = useRef();
  const listNavRef = useRef();
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);

  // for toggling the nav in mobile devices
  function ToggleNav() {
    const burger = burgerIconRef.current;
    const listNav = listNavRef.current;

    listNav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  }

  return (
    <nav>
      <h2>
        <Link to="/">DevR-Commerce</Link>
      </h2>

      <ul className="navLinks" ref={listNavRef}>
        <li>
          <NavLink activeClassName="nav_active" to="/" exact>
            Home
          </NavLink>
        </li>

        {/* if the user is authenticated, login and register button will not be shown */}
        {isAuthenticated ? (
          <li>{user.name}</li>
        ) : (
          <>
            <li>
              <NavLink activeClassName="nav_active" to="/login">
                Login
              </NavLink>
            </li>

            <li>
              <NavLink activeClassName="nav_active" to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <div className="bars" ref={burgerIconRef} onClick={ToggleNav}>
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
      </div>
    </nav>
  );
};

export default Nav;
