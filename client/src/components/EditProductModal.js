import { IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/actions/editProductModalActions";
import { getProductData } from "../redux/actions/singleProductActions";

const EditProductModal = () => {
  const { product } = useSelector((state) => state.editProductModalReducer);
  const { user } = useSelector((state) => state.authReducer);

  // for handling all the single input fields
  const [input, setInput] = useState({
    title: product.title,
    desc: product.desc,
    price: product.price,
    max_quantity: product.max_quantity,
    product_category: product.product_category,
  });
  // for the multiple select shipping options fields
  const [shippingOptions, setShippingOptions] = useState(
    product.shipping_options.map((option) => option._id) || []
  );

  // for handling all the image stuffs
  const [productImages, setProductImages] = useState(product.images || []);

  const [responseSentToServer, setResponseSentToSever] = useState(false);

  const productCategories = useSelector((state) => state.getProductCategories);
  const dispatch = useDispatch();
  const history = useHistory();

  // * for handling input changes
  function HandleInputChange(event) {
    const { name, value } = event.target;
    setInput((pre) => ({ ...pre, [name]: value }));
  }

  // * for saving the current changes in the DB
  async function saveChanges() {
    const { title, desc, price, max_quantity, product_category } = input;
    setResponseSentToSever(true);

    const shipping_options_separated_in_array = [];

    // I have a id of the shipping option stored in the user model
    // so I am just parsing it and separating all of them under an array
    for (let i = 0; i < shippingOptions.length; i++) {
      const parsedOption = user.shipping_options.find(
        (option) => option._id === shippingOptions[i]
      );

      shipping_options_separated_in_array.push(parsedOption);
    }

    const formData = new FormData();

    // appending all the images
    productImages.map((image) => {
      formData.append("assets", image.file || image.photoId);
    });
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("max_quantity", max_quantity);
    formData.append("product_category", product_category);
    formData.append(
      "shipping_options",
      JSON.stringify(shipping_options_separated_in_array)
    );
    formData.append("productId", product._id);

    try {
      const res = await fetch("/get_product/update_product", {
        method: "POST",
        body: formData,
      });

      const body = await res.json();

      if (res.status === 200) {
        setResponseSentToSever(false);
        dispatch(closeModal());
        dispatch(getProductData(body.product));
        history.push(`/product/${body.product._id}`);
        toast.dark(body.message);
      } else if (res.status === 500) {
        toast.error(body.message);
        setResponseSentToSever(false);
      }
    } catch (err) {
      console.log(err);
      setResponseSentToSever(false);
      toast.error(err.message);
    }
  }

  // * for validating all the input informations
  function Validate() {
    const { title, desc, price, max_quantity, product_category } = input;

    const validations = {
      allFields: title && desc && price && max_quantity && product_category,
      oneShippingOption: shippingOptions.length > 0,
      oneProductImage: productImages.length > 0,
    };

    const { allFields, oneShippingOption, oneProductImage } = validations;

    if (!allFields) {
      toast.error("Please fill all the fields properly");
    } else if (!oneShippingOption) {
      toast.error("You have to add one shipping option");
    } else if (!oneProductImage) {
      toast.error("Please upload at least one product image");
    } else if (allFields && oneShippingOption && oneProductImage) {
      toast.info("Processing...", {
        hideProgressBar: true,
      });
      saveChanges();
    }
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
                {productCategories.map((category, index) => {
                  return (
                    <option key={index} value={`${category}`}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="single_field">
              <select
                onChange={(event) =>
                  setShippingOptions(
                    Array.from(
                      event.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                multiple
                value={shippingOptions}
              >
                <option value="" disabled>
                  Edit Shipping options
                </option>
                {user.shipping_options.map((option) => {
                  return (
                    <option value={option._id} key={option._id}>
                      {option.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="single_field">
              {productImages.length > 0 ? (
                <div className="image_container">
                  {productImages.map((image) => {
                    return (
                      <div
                        className="single_image"
                        key={image._id}
                        style={{
                          background: `url(${image.photoUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    );
                  })}
                </div>
              ) : (
                <div className="no_image">
                  <h2>No Images</h2>
                </div>
              )}
            </div>

            {/* the user can remove all the old images by clicking this button */}
            <div className="single_field">
              <Button
                onClick={() => setProductImages([])}
                component="span"
                variant="contained"
                disabled={productImages.length <= 0}
                color="secondary"
              >
                Remove Images
              </Button>
            </div>

            {/* the file upload button and its functionalities */}
            <div className="single_field">
              <input
                id="contained-button-file"
                disabled={
                  productImages.length >= 10 || productImages.length > 0
                }
                multiple
                type="file"
                accept="image/jpeg, image/png"
                style={{ display: "none" }}
                onChange={(event) => {
                  // maximum product image count is 10, the user cannot add more than 10 images
                  if (
                    !(event.target.files.length + productImages.length > 10)
                  ) {
                    const temp = [];

                    for (let i = 0; i < event.target.files.length; i++) {
                      temp.push({
                        photoUrl: URL.createObjectURL(event.target.files[i]),
                        _id: Date.now().toString() + i,
                        file: event.target.files[i],
                      });
                    }

                    setProductImages((pre) => [...pre, ...temp]);
                  } else {
                    toast.error("You cannot add upto 10 images");
                  }
                }}
              />
              <label htmlFor="contained-button-file">
                <Button
                  disabled={
                    productImages.length >= 10 || productImages.length > 0
                  }
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  Upload Images
                </Button>
              </label>
            </div>

            <div className="single_field">
              <Button
                disabled={responseSentToServer}
                variant="contained"
                onClick={Validate}
              >
                Update Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
