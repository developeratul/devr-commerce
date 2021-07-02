const StoreSettings = ({ TabPanel, value, theme, user }) => {
  return (
    <div>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item One
      </TabPanel>
    </div>
  );
};

export default StoreSettings;
