import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./Admintabs.css";
import { History } from "history";

import AddBook from "./AddBook";
import AdminBooklist from "./AdminBooklist";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface hProps {
  history: History;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    backgroundColor: "grey",
    width: "50%",
  },
}));

export default function SimpleTabs(props: hProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="admin">
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab className={classes.tabs} label="책 관리" {...a11yProps(0)} />
            <Tab className={classes.tabs} label="책 등록" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AdminBooklist history={props.history} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddBook history={props.history} />
        </TabPanel>
      </div>
    </div>
  );
}
