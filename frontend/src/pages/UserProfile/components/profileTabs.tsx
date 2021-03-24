import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProductList from '../../HomePage/components/productList';
import UserProductList from './productList';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { User } from '../../../components/api/types';
import { UserStateData } from '../../../redux/user/user.reducer';
import EditUserForm from './editUserForm';

interface ProfileTabsProps {
  userData: UserStateData;
}

const ProfileTabs = ({ userData }: ProfileTabsProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="user-tabs"
          centered
        >
          <Tab label="Mine annonser" {...TabAttributtes(0)} />
          <Tab label="Favoritter" {...TabAttributtes(1)} />
          <Tab label="Rediger profil" {...TabAttributtes(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <UserProductList ownerId={userData.id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Her kommer favoritter
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EditUserForm
          id={userData.id}
          firstName={userData.firstName}
          lastName={userData.lastName}
          email={userData.email}
          phoneNumber={userData.phoneNumber}
          latitude={userData.latitude}
          longitude={userData.longitude}
        />
      </TabPanel>
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
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
};

const TabAttributtes = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ProfileTabs;
