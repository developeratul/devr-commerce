// this modal will contain all the things which are required to create a product
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const CreateProductModal = ({ createProductModalRef }) => {
  // for closing the modal
  function CloseModal() {
    const modal = createProductModalRef.current;

    modal.style.visibility = "hidden";
    document.body.style.overflow = null;
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

          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>
          <h1>Create Product</h1>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
