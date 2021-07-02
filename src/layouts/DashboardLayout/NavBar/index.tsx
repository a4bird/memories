import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  LogOut as LogOutIcon
} from 'react-feather';
import NavItem from './NavItem';
import { useAuthState } from 'src/context/Auth';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  // {
  //   href: '/app/customers',
  //   icon: UsersIcon,
  //   title: 'Customers'
  // },
  {
    href: '/app/albums',
    icon: ShoppingBagIcon,
    title: 'Albums'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }

  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  name: {
    margin: '5px 0px 0px 0px'
  }
}));

type Props = {
  openMobile: boolean;
  onMobileClose: () => void;
  onLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const NavBar = ({ openMobile, onMobileClose, onLogout }: Props) => {
  const classes = useStyles();

  const { userAccount } = useAuthState();

  const content = userAccount && userAccount.profile && (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={userAccount.photoUrl}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {`${userAccount.profile.firstName} ${userAccount.profile.lastName}`}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <Button className={classes.button} onClick={onLogout}>
            <LogOutIcon className={classes.icon} />
            <span className={classes.title}>Logout</span>
          </Button>
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary">
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
