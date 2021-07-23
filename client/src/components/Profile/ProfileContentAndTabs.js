import { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// tabs
import Followers from "./Tabs/Followers";
import Followings from "./Tabs/Followings";
import Store from "./Tabs/Store";

// all these functions are from the material-ui
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const ProfileContentAndTabs = ({ user }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  // from the material-Ui
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="profile_content_and_tabs">
      <div className="tab_and_appBar_and_tabs_container">
        {/* the app bar */}
        <AppBar className="app_bar" position="sticky">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label={user.isSeller ? "Store" : "Home"} {...a11yProps(0)} />
            <Tab label="Followers" {...a11yProps(1)} />
            <Tab label="Following" {...a11yProps(2)} />
            <Tab label="Reviews" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        {/* all the tabs will appear here */}
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <Store TabPanel={TabPanel} user={user} theme={theme} value={value} />
          <Followers
            TabPanel={TabPanel}
            user={user}
            theme={theme}
            value={value}
          />
          <Followings
            TabPanel={TabPanel}
            user={user}
            theme={theme}
            value={value}
          />

          <TabPanel value={value} index={3} dir={theme.direction}>
            <h1>Hello world</h1>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default ProfileContentAndTabs;
