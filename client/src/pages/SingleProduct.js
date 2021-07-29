import "../styles/SingleProduct/SingleProduct.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// components
import InlineLoader from "../components/InlineLoader";
import ProductInfo from "../components/SingleProduct/ProductInfo";
import ProductAuthorInfo from "../components/SingleProduct/ProductAuthorInfo";
import EditProductModal from "../components/EditProductModal";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const { modalShouldRender } = useSelector(
    (state) => state.editProductModalReducer
  );
  const { id } = useParams();
  const history = useHistory();

  // for fetching the informations of the product
  async function fetchProductData(abortController) {
    try {
      const res = await fetch(`/get_product/product_id/${id}`, {
        method: "GET",
        signal: abortController.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await res.json();

      if (res.status === 200) {
        setProduct(body.product);
        setAuthor(body.user);
        setLoading(false);
        document.title = body.product.title;
      } else if (res.status === 404) {
        history.push("/notFound");
        toast.error(body.message);
      }
    } catch (err) {
      history.push("/notFound");
      toast.error("Product Not Found");
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    document.title = loading ? "Loading..." : product.title;
    fetchProductData(abortController);

    return function () {
      setLoading(true);
      abortController.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="single_product_page">
        <div className="loader_container">
          <InlineLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="single_product_page">
      {modalShouldRender && <EditProductModal />}

      <div className="product_page_content_container">
        <ProductInfo product={product} />
        <ProductAuthorInfo author={author} currentProductId={product._id} />
      </div>
    </div>
  );
};

export default SingleProduct;
