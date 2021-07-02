import { Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/actions/authActions";

// for styling the material-ui components
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  input: {
    display: "none",
  },
}));

const UpdateAvatar = ({ user }) => {
  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  // for handling the file input
  const SelectFile = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    setFileInput(file);
  };

  // for settings a preview source just for the front-end
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // for uploading the image and update the fields in the database
  async function uploadAndUpdateUserAvatar() {
    try {
      let formData = new FormData();
      formData.append("image", fileInput);
      formData.append("userId", user._id);

      const res = await fetch("/get_user/upload_avatar", {
        method: "POST",
        body: formData,
      });

      const body = await res.json();

      if (res.ok) {
        dispatch(updateUser(body.user));
        history.push(`/profile/${user._id}`);
        toast.dark(body.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="settings_update_avatar">
      <div className="update_avatar_content_container">
        <div className="imgContainer">
          <Avatar
            src={previewSource ? previewSource : user.photoUrl}
            className={classes.large}
            alt={user.name}
          />
        </div>

        <div className="image_button_control">
          <div className="singleButton">
            <input
              accept="image/png, image/jpg, image/jpeg"
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={SelectFile}
            />

            <label htmlFor="contained-button-file">
              <Button
                className="upload_button"
                variant="contained"
                fullWidth
                component="span"
              >
                Upload Image
              </Button>
            </label>
          </div>

          <div className="singleButton">
            <Button
              variant="contained"
              onClick={uploadAndUpdateUserAvatar}
              fullWidth
              color="primary"
              disabled={!fileInput}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAvatar;
