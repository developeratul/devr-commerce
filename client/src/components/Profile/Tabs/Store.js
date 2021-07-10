import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

// icons
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";

// for styling the material-ui components
const useStyles = makeStyles(() => ({
  menuPaper: {
    backgroundColor: "#1a2634",
    color: "#fff",
  },
}));

const Store = ({ TabPanel, value, theme, user }) => {
  const authUser = useSelector((state) => state.authReducer);
  const classes = useStyles();

  // from the material-ui
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user.products) return "loading...";

  return (
    <div className="store_tab tab">
      <TabPanel value={value} index={0} dir={theme.direction}>
        <div className="store_product_container">
          <div className="some_seller_informations">
            <table border="1px">
              <tr>
                <td>Product Category</td>
                <td>{user.productCategory}</td>
              </tr>
              <tr>
                <td>Total Sales</td>
                <td>{user.totalSales}</td>
              </tr>
              <tr>
                <td>Total Products</td>
                <td>{user.products.length}</td>
              </tr>
              <tr>
                <td>Total Followers</td>
                <td>{user.followers.length}</td>
              </tr>
              <tr>
                <td>Total Followings</td>
                <td>{user.followings.length}</td>
              </tr>
              <tr>
                <td>Member since</td>
                <td>{user.memberSince}</td>
              </tr>
            </table>
          </div>

          {user.isSeller ? (
            user.products.length ? (
              <div className="store_container user_container">
                {user.products.map((product, index) => {
                  return (
                    <div className="single_product" key={index}>
                      <div
                        className="product_image"
                        style={{
                          background: `url(${product.images[0].photoUrl})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></div>

                      <div className="product_desc">
                        <Link
                          to={`/product/${product._id}`}
                          title={product.title}
                        >
                          <p className="product_title">
                            {product.title.slice(0, 50)}
                            {product.title.length > 50 ? "..." : ""}
                          </p>
                        </Link>
                      </div>

                      <div className="product_options">
                        {authUser.user._id === user._id ? (
                          <>
                            <IconButton
                              aria-controls="simple-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreHorizOutlinedIcon />
                            </IconButton>

                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                              classes={{ paper: classes.menuPaper }}
                            >
                              <MenuItem onClick={handleClose}>
                                Edit This Product
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                Delete Product
                              </MenuItem>
                            </Menu>
                          </>
                        ) : (
                          <IconButton>
                            <ShoppingCartOutlinedIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no_message">
                <h2>Not Products</h2>
              </div>
            )
          ) : (
            <div className="no_message">
              <h2>Not a seller</h2>
            </div>
          )}
        </div>
      </TabPanel>
    </div>
  );
};

export default Store;
