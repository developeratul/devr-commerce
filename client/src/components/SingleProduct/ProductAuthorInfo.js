import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
        <p>{author.about}</p>

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
