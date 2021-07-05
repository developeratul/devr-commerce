// this modal will contain all the things which are required to create a product
import { useState } from "react";

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";

const CreateProductModal = ({ createProductModalRef }) => {
  const [input, setInput] = useState({
    title: "",
    desc: "",
    price: "",
    max_quantity: "",
    product_category: "",
  });

  // for closing the modal
  function CloseModal() {
    const modal = createProductModalRef.current;

    modal.style.visibility = "hidden";
    modal.style.display = "none";
    document.body.style.overflow = null;

    setInput({
      title: "",
      desc: "",
      price: "",
      max_quantity: "",
      product_category: "",
    });
  }

  function HandleInputChange(event) {
    const { name, value } = event.target;

    setInput((pre) => ({ ...pre, [name]: value }));
  }

  return (
    <div className="create_product_modal" ref={createProductModalRef}>
      <div className="close_modal_button">
        <IconButton onClick={CloseModal}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className="container">
        <div className="create_product_modal_content_container">
          {/*  */}

          <h1 className="title">Create Product</h1>

          <div className="form_container">
            <div className="single_field">
              <input
                name="title"
                onChange={HandleInputChange}
                type="text"
                placeholder="Product Title"
                value={input.title}
              />
            </div>

            <div className="single_field">
              <textarea
                name="desc"
                cols="30"
                rows="10"
                placeholder="Product Description"
                onChange={HandleInputChange}
                value={input.desc}
              ></textarea>
            </div>

            <div className="single_field">
              <input
                name="price"
                onChange={HandleInputChange}
                type="number"
                placeholder="Product Price"
                value={input.price}
              />
            </div>

            <div className="single_field">
              <input
                name="max_quantity"
                onChange={HandleInputChange}
                type="number"
                placeholder="Max quantity"
                value={input.max_quantity}
              />
            </div>

            <div className="single_field">
              <Button variant="contained">Post Product</Button>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
