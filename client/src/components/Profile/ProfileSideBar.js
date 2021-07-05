import { Avatar, Tooltip, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";

import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import WarningIcon from "@material-ui/icons/Warning";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const ProfileSideBar = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const classes = useStyles();
  const authUser = useSelector((state) => state.authReducer);
  const { isAuthenticated } = authUser;
  const history = useHistory();

  // for checking the following status
  // if this guy is already followed
  function checkFollowingStatus() {
    if (user.followers) {
      for (let i = 0; i < user.followers.length; i++) {
        if (user.followers[i] === authUser.user._id) {
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

      if (res.status === 200) {
        setIsFollowing(true);
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

      if (res.status === 200) {
        setIsFollowing(false);
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
          <p>
            from: <span>{user.country}</span>
          </p>

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

            {/* <div className="report_user single_option">
              <Button>Report</Button>
            </div> */}
          </div>
        </div>

        <div className="common_user_information">
          <p>
            This guy is a seller: <span>{user.isSeller ? "Yes" : "no"}</span>
          </p>
          {/* if this guy is a seller */}
          {user.isSeller ? (
            <p>
              Total sales: <span>{user.totalSales}</span>
            </p>
          ) : null}
          {/* what type of products does he sells */}
          {user.isSeller && user.productCategory ? (
            <p>
              Product Category: <span>{user.productCategory}</span>
            </p>
          ) : null}
          {/* if this guy want to show his email */}
          {user.showEmail && user.isSeller ? (
            <p>
              Email: <span>{user.email}</span>
            </p>
          ) : null}
          {/* if the user wants to show his phone number */}
          {user.showPhone && user.isSeller ? (
            <p>
              Phone: <span>{user.phone}</span>
            </p>
          ) : null}
          <p>
            Member since: <span>{user.memberSince}</span>
          </p>
          {user.isVerified ? (
            <p className="verifiedText">Verified and trusted by devR</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
