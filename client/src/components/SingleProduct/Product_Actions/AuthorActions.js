import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { IconButton } from "@material-ui/core";

// actions
import { openModal } from "../../../redux/actions/editProductModalActions";
import { updateUser } from "../../../redux/actions/authActions";

const AuthorActions = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  async function deleteProduct() {
    try {
      const confirmed = window.confirm(
        "Are you sure you wanna delete this product?"
      );

      if (confirmed) {
        toast.info("Deleting...", {
          hideProgressBar: true,
        });

        const res = await fetch("/get_product/delete_product", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
        });

        const body = await res.json();

        if (res.status === 200) {
          dispatch(updateUser(body.user));
          history.push(`/profile/${product.user._id}`);
          toast.dark(body.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="author_actions actions">
      <div className="single_action">
        <IconButton onClick={() => dispatch(openModal(product))}>
          <EditOutlinedIcon />
        </IconButton>
      </div>

      <div className="single_action">
        <IconButton onClick={deleteProduct}>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AuthorActions;
