import React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  Drawer as MuiDrawer,
  IconButton,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Aside from '@/components/Admin/Layout/Aside';

interface AdminLayoutProp {
  children?: React.ReactNode;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

function AdminLayout({ children }: AdminLayoutProp) {
  const [open, setOpen] = React.useState(true);

  const themeOptions = (process.env.APP_URL || '').includes('borra.today')
    ? {
        palette: {
          primary: {
            light: '#ef5350',
            main: '#d32f2f',
            dark: '#c62828',
          },
          error: {
            light: '#42a5f5',
            main: '#1976d2',
            dark: '#1565c0',
          },
        },
      }
    : {};

  const mdTheme = createTheme(themeOptions);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Aside onClick={toggleDrawer} />
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            padding: '20px',
            marginTop: '60px',
            backgroundColor: theme => theme.palette.grey[100],
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminLayout;

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
    }),
  },
}));
