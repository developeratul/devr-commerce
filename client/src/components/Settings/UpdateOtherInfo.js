import PropTypes from "prop-types";
import { React, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import AccountSettings from "./Tabs/AccountSettings";
import SecuritySettings from "./Tabs/SecuritySettings";
// import StoreSettings from "./Tabs/StoreSettings";

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

const UpdateOtherInfo = ({ user }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="settings_update_other_info">
      {/* the app bar */}
      <AppBar position="sticky" color="primary" className="app_bar">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Account" {...a11yProps(0)} />
          <Tab label="Security" {...a11yProps(1)} />
          {/* <Tab label="Store" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>

      {/* the tabpanel */}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* All the account related settings will be here */}
        <AccountSettings
          user={user}
          TabPanel={TabPanel}
          theme={theme.direction}
          value={value}
        />

        {/* All the security password settings will be here */}
        <SecuritySettings
          user={user}
          TabPanel={TabPanel}
          theme={theme.direction}
          value={value}
        />

        {/* All the store settings will be here */}
        {/* <StoreSettings
          user={user}
          TabPanel={TabPanel}
          theme={theme.direction}
          value={value}
        /> */}
      </SwipeableViews>
    </div>
  );
};

export default UpdateOtherInfo;
