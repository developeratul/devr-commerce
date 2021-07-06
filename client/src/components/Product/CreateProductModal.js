// this modal will contain all the things which are required to create a product
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";

const CreateProductModal = ({ createProductModalRef, user }) => {
  // for handling all the inputs
  const [input, setInput] = useState({
    title: "",
    desc: "",
    price: "",
    max_quantity: "",
    product_category: "",
  });
  // for containing the uploaded files
  const [fileAra, setFileAra] = useState([]);

  const [previewFileObject, setPreviewFileObject] = useState([]);
  const productCategories = useSelector((state) => state.getProductCategories);

  // handling the drop-zone drop
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    if (acceptedFiles.length > 10) {
      toast.error("You can not add upto 10 images");
    } else if (acceptedFiles.length <= 10) {
      setFileAra(acceptedFiles);
    }
  }, []);

  // for handling the file upload drop-zone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
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
    setFileAra([]);
  }

  // for handling all the input changes
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
              <select value="">
                <option value="" disabled>
                  Select Product Category
                </option>

                {productCategories.map((category, index) => {
                  return (
                    <option value={category} key={index}>
                      {category}
                    </option>
                  );
                })}
              </select>
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
              {user.shipping_options.length > 0 ? (
                <select name="shipping_option" value="">
                  <option value="" disabled>
                    Add Shipping Option
                  </option>
                  {user.shipping_options.map((option, index) => {
                    return (
                      <option value={option.title} key={index}>
                        {option.title} - $ {option.charge}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <p>
                  You don't have any shipping options yet. Go to{" "}
                  <Link to="/settings">Store Settings</Link> to add one.
                  Otherwise you are unable to upload a product. You must have
                  one shipping option.
                </p>
              )}
            </div>

            {/* file uploading and image preview zone */}
            <div className="single_field">
              {!fileAra.length ? (
                <div className="file_upload_zone">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />

                    {isDragActive ? (
                      <p>Drop your files here...</p>
                    ) : (
                      <p>Drag and Drop your product images or Click here</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="image_container">
                  {fileAra.map((file, index) => (
                    <p>{file.path}</p>
                  ))}
                </div>
              )}
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
