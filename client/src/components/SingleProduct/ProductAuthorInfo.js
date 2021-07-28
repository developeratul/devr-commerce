import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// icons
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import WebIcon from "@material-ui/icons/Web";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import PhoneEnabledOutlinedIcon from "@material-ui/icons/PhoneEnabledOutlined";

// for styling the material-ui components
const useStyles = makeStyles((theme) => ({
  image: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const ProductAuthorInfo = ({ author, currentProductId }) => {
  const authorProducts = author.products.filter(
    (product) => product._id !== currentProductId
  );

  const classes = useStyles();

  return (
    <div className="product_author_info">
      <div className="author_image">
        <Avatar
          src={author.photoUrl}
          className={classes.image}
          alt={author.name}
        />
      </div>

      <div className="author_info">
        <h2>
          <Link to={`/profile/${author._id}`}>{author.name}</Link>
        </h2>
        <p className="from">
          from: <span>{author.country}</span>
        </p>

        {author.portfolio ||
        author.facebook ||
        author.linkedIn ||
        author.twitter ? (
          <div className="social_links_container">
            {author.portfolio && (
              <div className="single_link portfolio">
                <a
                  href={author.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WebIcon />
                </a>
              </div>
            )}
            {author.twitter && (
              <div className="single_link twitter">
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon />
                </a>
              </div>
            )}
            {author.facebook && (
              <div className="single_link facebook">
                <a
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
              </div>
            )}
            {author.linkedIn && (
              <div className="single_link linkedIn">
                <a
                  href={author.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              </div>
            )}
          </div>
        ) : null}

        <p className="about">
          {author.about ? author.about : <span>404 Bio not found</span>}
        </p>

        <div className="author_email_and_phone">
          {author.showEmail && (
            <p>
              <span>
                <DraftsOutlinedIcon />
              </span>{" "}
              {author.email}
            </p>
          )}
          {author.showPhone && (
            <p>
              <span>
                <PhoneEnabledOutlinedIcon />
              </span>{" "}
              {author.phone}
            </p>
          )}
        </div>

        {author.products.length > 1 && (
          <div className="more_from_section">
            <p className="section_title">
              More from <span>{author.name}:</span>
            </p>

            {authorProducts.map((product, index) => {
              return (
                <div className="single_product" key={index}>
                  <div className="product_image">
                    <img src={product.images[0].photoUrl} alt={product.title} />
                  </div>

                  <div className="product_desc">
                    <h2>
                      <Link to={`/product/${product._id}`}>
                        {product.title.slice(0, 20)}
                        {product.title.length > 20 ? "..." : ""}
                      </Link>
                    </h2>
                    <p>{product.price} $</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAuthorInfo;
