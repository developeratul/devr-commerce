import { IconButton, Tooltip } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

const FloatingButton = ({ createProductModalRef }) => {
  function OpenModal() {
    const modal = createProductModalRef.current;

    modal.style.visibility = "visible";
    document.body.style.overflow = "hidden";
  }

  return (
    <div className="product_page_floating_button">
      <Tooltip title="Create a new Product">
        <IconButton onClick={OpenModal}>
          <AddOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default FloatingButton;
