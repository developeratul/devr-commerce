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

const Followers = ({ TabPanel, value, theme, user }) => {
  const classes = useStyles();

  return (
    <div className="follower_tab tab">
      <TabPanel value={value} index={1} dir={theme.direction}>
        {user.followers.length ? (
          <div className="follower_users_container user_container">
            {user.followers.map((followerUser, index) => {
              return (
                <div className="single_user" key={index}>
                  <div className="user_img">
                    <Avatar
                      className={classes.large}
                      src={followerUser.photoUrl}
                      alt={followerUser.name}
                    />
                  </div>

                  <div className="user_desc">
                    <h2>
                      <Link to={`/profile/${followerUser._id}`}>
                        {followerUser.name}
                      </Link>
                    </h2>
                    <p>
                      From: <span>{followerUser.country}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no_message">
            <h2>No Followers</h2>
          </div>
        )}
      </TabPanel>
    </div>
  );
};

export default Followers;
