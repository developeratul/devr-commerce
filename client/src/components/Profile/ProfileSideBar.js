import { Avatar, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import WarningIcon from "@material-ui/icons/Warning";

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
  const classes = useStyles();

  return (
    <div className="profile_side_bar">
      <div className="profile_picture">
        <Avatar
          src={user.name}
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
            <p>
              <p>Verified and trusted by devR</p>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
