// this modal will contain all the things which are required to create a product
import { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";

import productCategories from "../../data/productCategories";

const CreateProductModal = ({ createProductModalRef, user }) => {
  // for handling all the inputs
  const [input, setInput] = useState({
    title: "",
    desc: "",
    price: "",
    max_quantity: "",
    product_category: "",
  });
  const [responseSentToServer, setResponseSentToServer] = useState(false);
  const [shipping_options, set_shipping_options] = useState([]);
  // for containing the uploaded files
  const [fileAra, setFileAra] = useState([]);

  const [previewFileObject, setPreviewFileObject] = useState([]);
  const history = useHistory();

  // handling the drop-zone drop
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error("We accept only .jpg and .png type files");
    } else if (acceptedFiles.length > 10) {
      toast.error("You can not add upto 10 images");
    } else if (acceptedFiles.length <= 10) {
      setFileAra(acceptedFiles);

      for (let i = 0; i < acceptedFiles.length; i++) {
        const singleImage = URL.createObjectURL(acceptedFiles[i]);
        setPreviewFileObject((pre) => [...pre, singleImage]);
      }
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
    set_shipping_options([]);
    setPreviewFileObject([]);
    setFileAra([]);
  }

  const { title, desc, price, max_quantity, product_category } = input;

  // for handling all the input changes
  function HandleInputChange(event) {
    const { name, value } = event.target;

    setInput((pre) => ({ ...pre, [name]: value }));
  }

  // for uploading a product
  async function uploadProduct() {
    setResponseSentToServer(true);

    try {
      const formData = new FormData();
      let shipping_options_separated_in_array = [];

      // I have a id of the shipping option stored in the user model
      // so I am just parsing it and separating all of them under an array
      for (let i = 0; i < shipping_options.length; i++) {
        const parsedOption = user.shipping_options.find(
          (option) => option._id === shipping_options[i]
        );

        shipping_options_separated_in_array.push(parsedOption);
      }

      // if you want to send any array or non text, you have the stringify them
      // then you have to parse them in to server side then save them
      formData.append(
        "shipping_options",
        JSON.stringify(shipping_options_separated_in_array)
      );
      fileAra.map((file) => formData.append("assets", file));
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("max_quantity", max_quantity);
      formData.append("product_category", product_category);

      const res = await fetch("/get_product/post_product", {
        method: "POST",
        body: formData,
      });

      const body = await res.json();

      if (res.status === 200) {
        history.push(`/profile/${user._id}`);
        toast.dark(body.message);
        setResponseSentToServer(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // for validating the input information's
  function Validate() {
    const validations = {
      all_fields: title && desc && price && max_quantity && product_category,
      one_image: fileAra.length > 0,
      one_shipping_option: shipping_options.length > 0,
    };

    const { all_fields, one_image, one_shipping_option } = validations;

    if (!all_fields) {
      toast.error("Please fill the fields properly");
    } else if (!one_image) {
      toast.error("Please upload at least one image for your product");
    } else if (!one_shipping_option) {
      toast.error("Please select at least one shipping option");
    } else if (all_fields && one_image && one_shipping_option) {
      toast.info("Uploading...");
      uploadProduct();
    }
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
              <select
                value={input.product_category}
                name="product_category"
                onChange={HandleInputChange}
              >
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
                <select
                  multiple
                  name="shipping_option"
                  value={shipping_options}
                  onChange={(event) =>
                    set_shipping_options(
                      Array.from(
                        event.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  <option value="" disabled multiple>
                    Add Shipping Option
                  </option>
                  {user.shipping_options.map((option, index) => {
                    return (
                      <option value={option._id} key={index}>
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
                <>
                  <h2 className="uploaded_image_Section_title">
                    Product Images
                  </h2>
                  <div className="image_container">
                    {previewFileObject.map((url, index) => (
                      <div className="single_image" key={index}>
                        <img src={url} alt={url} />
                      </div>
                    ))}
                  </div>

                  <div className="remove_image_button">
                    <Button
                      onClick={() => {
                        setFileAra([]);
                        setPreviewFileObject([]);
                      }}
                      variant="contained"
                    >
                      Remove Images
                    </Button>
                  </div>
                </>
              )}
            </div>

            <div className="single_field">
              <Button
                onClick={Validate}
                disabled={responseSentToServer}
                variant="contained"
              >
                Post Product
              </Button>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
