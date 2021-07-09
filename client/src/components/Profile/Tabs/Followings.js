import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// for styling the material-ui Avatar component
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Followings = ({ TabPanel, value, theme, user }) => {
  const classes = useStyles();

  return (
    <div className="following_tab tab">
      <TabPanel value={value} index={2} dir={theme.direction}>
        {user.followings.length ? (
          <div className="following_users_container user_container">
            {user.followings.map((followingUser, index) => {
              return (
                <div className="single_user" key={index}>
                  <div className="user_img">
                    <Avatar
                      className={classes.large}
                      src={followingUser.photoUrl}
                      alt={followingUser.name}
                    />
                  </div>

                  <div className="user_desc">
                    <h2>
                      <Link to={`/profile/${followingUser._id}`}>
                        {followingUser.name}
                      </Link>
                    </h2>
                    <p>
                      From: <span>{followingUser.country}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no_message">
            <h2>No Followings</h2>
          </div>
        )}
      </TabPanel>
    </div>
  );
};

export default Followings;
