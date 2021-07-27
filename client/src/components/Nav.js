import { useRef, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/actions/authActions";

import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { makeStyles } from "@material-ui/core/styles";
import useTotalCartQuantity from "../hooks/useTotalCartQuantity";

// for styling the material-ui components
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  menuPaper: {
    backgroundColor: "#1a2634",
    color: "#fff",
  },
  linkFont: {
    fontFamily: "Poppins",
  },
}));

const Nav = () => {
  const burgerIconRef = useRef();
  const listNavRef = useRef();

  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  let total_cart_items = useTotalCartQuantity();

  const classes = useStyles();

  // for toggling the nav in mobile devices
  function ToggleNav() {
    const burger = burgerIconRef.current;
    const listNav = listNavRef.current;

    listNav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  }

  // for logging out the authenticated user
  async function logOut() {
    try {
      const res = await fetch("/get_auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });

      const body = await res.json();

      if (res.status === 200) {
        dispatch(logOutUser());
        history.push("/login");
        toast.dark(body.message);
      }
    } catch (err) {
      toast.error("You are not logged in how do you think about logout!");
      console.log(err);
    }
  }

  // from the material-ui
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuLink = {
    color: "#fff",
  };

  return (
    <nav>
      <h2>
        <Link to="/">DVC</Link>
      </h2>

      <ul className="navLinks" ref={listNavRef}>
        {/* universals */}
        <li>
          <NavLink activeClassName="nav_active" to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="nav_active" to="/products">
            Products
          </NavLink>
        </li>

        {/* if the user is authenticated, login and register button will not be shown */}
        {/* instead his profile information's, cart and the other stuffs will be shown */}
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/cart">
                <IconButton color="secondary">
                  <Badge badgeContent={total_cart_items} color="secondary">
                    <ShoppingCartOutlinedIcon className="icon" />
                  </Badge>
                </IconButton>
              </NavLink>
            </li>

            {/* user options */}
            <li>
              {/* onClicking on this button the menu should be popped out */}
              <IconButton
                size="small"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Avatar
                  src={user.photoUrl}
                  alt={user.name}
                  className={classes.small}
                ></Avatar>
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                classes={{ paper: classes.menuPaper }}
              >
                <Link style={menuLink} to={`/profile/${user._id}`}>
                  <MenuItem className="menuItem" onClick={handleClose}>
                    View My Profile
                  </MenuItem>
                </Link>

                <Link style={menuLink} to={`/settings`}>
                  <MenuItem className="menuItem" onClick={handleClose}>
                    Account Settings
                  </MenuItem>
                </Link>

                <MenuItem className="menuItem" onClick={handleClose}>
                  <div onClick={logOut}>Log into another account</div>
                </MenuItem>
              </Menu>
            </li>
          </>
        ) : (
          // if the user is not authenticated
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
