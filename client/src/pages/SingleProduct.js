import "../styles/SingleProduct/SingleProduct.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getProductData } from "../redux/actions/singleProductActions";

// components
import InlineLoader from "../components/InlineLoader";
import ProductInfo from "../components/SingleProduct/ProductInfo";
import ProductAuthorInfo from "../components/SingleProduct/ProductAuthorInfo";
import EditProductModal from "../components/EditProductModal";

function SingleProduct() {
  const product = useSelector((state) => state.singleProductReducer);
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const { modalShouldRender } = useSelector(
    (state) => state.editProductModalReducer
  );
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

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
        dispatch(getProductData(body.product));
        setAuthor(body.user);
        setLoading(false);
        document.title = `${body.user.name} on DevR Commerce - ${body.product.title}`;
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
      {/* the modal to edit products */}
      {modalShouldRender && <EditProductModal />}

      {/* the productInfo component is containing the product related actions and informations */}
      {/* and the productAuthorInfo is containing informations about the product author */}
      <div className="product_page_content_container">
        <ProductInfo />
        <ProductAuthorInfo author={author} />
      </div>
    </div>
  );
}

export default SingleProduct;
