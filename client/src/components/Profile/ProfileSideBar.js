import { Avatar, Tooltip, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import WarningIcon from "@material-ui/icons/Warning";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/authActions";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// icons
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import WebIcon from "@material-ui/icons/Web";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import PhoneEnabledOutlinedIcon from "@material-ui/icons/PhoneEnabledOutlined";

// for styling the material-ui Avatar component
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const ProfileSideBar = () => {
  // the data of the user which was fetched
  const user = useSelector((state) => state.profileReducer);
  // the authenticated user who is visiting that page
  const authUser = useSelector((state) => state.authReducer);
  const [isFollowing, setIsFollowing] = useState(false);
  const classes = useStyles();
  const { isAuthenticated } = authUser;
  const history = useHistory();
  const dispatch = useDispatch();

  // for checking the following status
  // if this guy is already followed
  function checkFollowingStatus() {
    if (user.followers) {
      for (let i = 0; i < user.followers.length; i++) {
        if (user.followers[i]._id === authUser.user._id) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      }
    }
  }

  // for following a user
  async function follow() {
    try {
      const res = await fetch("/get_user/follow_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gettingFollowUserId: user._id,
        }),
      });

      const body = await res.json();

      if (res.status === 200) {
        setIsFollowing(true);
        // updating the following list of the auth user
        dispatch(updateUser(body.user));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // for unfollowing a user
  async function unFollow() {
    try {
      const res = await fetch("/get_user/unfollow_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gettingFollowUserId: user._id,
        }),
      });

      const body = await res.json();

      if (res.status === 200) {
        setIsFollowing(false);
        // updating the following list of the auth user
        dispatch(updateUser(body.user));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // onclick action
  function ChangeFollow() {
    // if the user is already following the user,
    // the unfollow function should be called
    // otherwise the follow function should be called
    if (!isFollowing) {
      follow();
    } else {
      unFollow();
    }
  }

  // if the user is not authenticated, and he tries to follow or report
  function NoAuth() {
    history.push("/login");
    toast.info("Please login to perform this action");
  }

  useEffect(() => {
    checkFollowingStatus();
  }, [user]);

  return (
    <div className="profile_side_bar">
      <div className="profile_picture">
        <Avatar
          src={user.photoUrl}
          alt={`${user.name}'s profile picture`}
          className={classes.large}
        />

        <div className="is_user_verified">
          {user.isVerified ? (
            <Tooltip title="devR verified trusted seller">
              <VerifiedUserIcon className="verified_icon" />
            </Tooltip>
          ) : (
            <Tooltip title="This seller is not trusted by devR yet">
              <WarningIcon className="not_verified_icon" />
            </Tooltip>
          )}
        </div>
      </div>

      <div className="profile_user_info">
        <div className="profile_user_name_and_basic_info">
          <h2>{user.name}</h2>
          <p className="rating">
            5{" "}
            <span>
              <StarBorderIcon />
            </span>
          </p>
          <p>
            from: <span>{user.country}</span>
          </p>

          <div className="user_links">
            {user.portfolio && (
              <div className="single_link portfolio">
                <a
                  href={user.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WebIcon />
                </a>
              </div>
            )}
            {user.twitter && (
              <div className="single_link twitter">
                <a
                  href={user.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon />
                </a>
              </div>
            )}
            {user.facebook && (
              <div className="single_link facebook">
                <a
                  href={user.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
              </div>
            )}
            {user.linkedIn && (
              <div className="single_link linkedIn">
                <a
                  href={user.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              </div>
            )}
          </div>

          <div className="follow_user_or_report_section">
            <div className="follow_user single_option">
              {user._id === authUser.user._id ? (
                <Button component={Link} to={`/settings`}>
                  Edit Profile
                </Button>
              ) : (
                <Button onClick={isAuthenticated ? ChangeFollow : NoAuth}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="common_user_information">
          <p className="user_bio">
            {user.about ? (
              <>
                <span className="section_title">About</span>
                {user.about}
              </>
            ) : (
              <span className="no_bio">404 Bio not found</span>
            )}
          </p>

          <div className="user_phone_and_email">
            {user.showEmail && (
              <div className="email single">
                <span>
                  <DraftsOutlinedIcon />
                </span>{" "}
                {user.email}
              </div>
            )}
            {user.showPhone && (
              <div className="phone single">
                <span>
                  <PhoneEnabledOutlinedIcon />
                </span>{" "}
                {user.phone}
              </div>
            )}
          </div>

          {/* <div className="platform_information_of_user">
            <div className="single_information">
              {user.isSeller ? <span>Seller</span> : <span>Not a Seller</span>}
            </div>
            {user.isVerified && (
              <div className="single_information">
                <span>DevR Verified</span>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
