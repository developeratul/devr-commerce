import "../styles/Product/product.css";
import { useSelector } from "react-redux";
import { useRef } from "react";

// components
import FloatingButton from "../components/Product/FloatingButton";
import CreateProductModal from "../components/Product/CreateProductModal";

const Product = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);

  const createProductModalRef = useRef();

  return (
    <div className="product_page">
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
      <h1>Hello world</h1>

      {/* if the user is authenticated and if he is a seller than he is able to click on that button */}
      {isAuthenticated && user.isSeller && (
        <FloatingButton createProductModalRef={createProductModalRef} />
      )}
      {isAuthenticated && user.isSeller && (
        <CreateProductModal createProductModalRef={createProductModalRef} />
      )}
    </div>
  );
};

export default Product;
