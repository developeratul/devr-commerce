import { IconButton, Tooltip, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/actions/editProductModalActions";

const EditProductModal = () => {
  const { product } = useSelector((state) => state.editProductModalReducer);
  const { user } = useSelector((state) => state.authReducer);
  const [input, setInput] = useState({
    title: product.title,
    desc: product.desc,
    price: product.price,
    max_quantity: product.max_quantity,
    product_category: product.product_category,
  });
  const [shippingOptions, setShippingOptions] = useState(
    product.shipping_options.map((option) => option._id) || []
  );

  const [oldImages, setOldImages] = useState(product.images || []);

  const productCategories = useSelector((state) => state.getProductCategories);
  const dispatch = useDispatch();

  function HandleInputChange(event) {
    const { name, value } = event.target;
    setInput((pre) => ({ ...pre, [name]: value }));
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="edit_product_modal">
      <div className="close_modal_button_container">
        <IconButton
          onClick={() => {
            dispatch(closeModal());
            setInput({
              title: "",
              desc: "",
              price: "",
              max_quantity: "",
              product_category: "",
            });
            setShippingOptions([]);
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <div className="container">
        <div className="model_content_box">
          <h2 className="modal_title">Edit Product</h2>

          <div className="form_container">
            <div className="single_field">
              <input
                type="text"
                placeholder="Edit product title"
                onChange={HandleInputChange}
                value={input.title}
                name="title"
              />
            </div>
            <div className="single_field">
              <textarea
                name="desc"
                cols="30"
                rows="10"
                placeholder="Edit description"
                onChange={HandleInputChange}
                value={input.desc}
              ></textarea>
            </div>
            <div className="single_field">
              <input
                type="number"
                placeholder="Edit prince"
                onChange={HandleInputChange}
                value={input.price}
                name="price"
              />
            </div>
            <div className="single_field">
              <input
                type="number"
                placeholder="Edit Max quantity"
                onChange={HandleInputChange}
                value={input.max_quantity}
                name="max_quantity"
              />
            </div>
            <div className="single_field">
              <select
                name="product_category"
                onChange={HandleInputChange}
                value={input.product_category}
              >
                <option value="" disabled>
                  Edit Product Category
                </option>
                {productCategories.map((category) => {
                  return <option value={`${category}`}>{category}</option>;
                })}
              </select>
            </div>
            <div className="single_field">
              <select
                onChange={(event) =>
                  Array.from(
                    event.target.selectedOptions,
                    (option) => option.value
                  )
                }
                multiple
                value={shippingOptions}
              >
                <option value="" disabled>
                  Edit Shipping options
                </option>
                {user.shipping_options.map((option, index) => {
                  return (
                    <option value={option._id} key={index}>
                      {option.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="single_field">
              <div className="image_container">
                {oldImages.map((image, index) => {
                  return (
                    <div
                      className="single_image"
                      key={index}
                      style={{
                        background: `url(${image.photoUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="remove_button">
                        <Tooltip title="Remove this image">
                          <IconButton>
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="single_field">
              <Button variant="contained">Update Product</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
