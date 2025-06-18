import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemText, 
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  School as SchoolIcon, 
  Info as InfoIcon, 
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Dashboard as DashboardIcon, 
  Person as ProfileIcon, 
  Add as CreateIcon, 
  Logout as LogoutIcon
} from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, isTeacher, isStudent, logout } = useAuth();
  const navigate = useNavigate();

  // Common menu items for all users
  const menuItems: MenuItem[] = [
    { text: 'Главная', path: '/', icon: <HomeIcon /> },
    { text: 'Курсы', path: '/courses', icon: <SchoolIcon /> },
    { text: 'О нас', path: '/about', icon: <InfoIcon /> },
  ];

  // Auth items for non-authenticated users
  const authItems: MenuItem[] = [
    { text: 'Войти', path: '/login', icon: <LoginIcon /> },
    { text: 'Регистрация', path: '/register', icon: <RegisterIcon /> },
  ];
  
  // Teacher specific menu items
  const teacherItems: MenuItem[] = [
    { text: 'Панель управления', path: '/teacher/dashboard', icon: <DashboardIcon /> },
    { text: 'Профиль', path: '/teacher/profile', icon: <ProfileIcon /> },
    { text: 'Создать курс', path: '/teacher/courses/create', icon: <CreateIcon /> },
  ];
  
  // Student specific menu items
  const studentItems: MenuItem[] = [
    { text: 'Панель управления', path: '/student/dashboard', icon: <DashboardIcon /> },
    { text: 'Профиль', path: '/student/profile', icon: <ProfileIcon /> },
  ];
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          QazaQEduPlus
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text}
            sx={{
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              backgroundColor: location.pathname === item.path ? 'primary.light' : 'transparent',
              color: location.pathname === item.path ? 'white' : 'inherit',
              '& .MuiListItemIcon-root': {
                color: location.pathname === item.path ? 'white' : 'inherit',
              },
            }}
          >
            <ListItemButton component={RouterLink} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      
      {/* Show role-specific menu items if authenticated */}
      {isAuthenticated ? (
        <>
          <List>
            {isTeacher && teacherItems.map((item) => (
              <ListItem 
                key={item.text}
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  backgroundColor: location.pathname === item.path ? 'primary.light' : 'transparent',
                  color: location.pathname === item.path ? 'white' : 'inherit',
                  '& .MuiListItemIcon-root': {
                    color: location.pathname === item.path ? 'white' : 'inherit',
                  },
                }}
              >
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            
            {isStudent && studentItems.map((item) => (
              <ListItem 
                key={item.text}
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  backgroundColor: location.pathname === item.path ? 'primary.light' : 'transparent',
                  color: location.pathname === item.path ? 'white' : 'inherit',
                  '& .MuiListItemIcon-root': {
                    color: location.pathname === item.path ? 'white' : 'inherit',
                  },
                }}
              >
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem 
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Выйти" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          {authItems.map((item) => (
            <ListItem 
              key={item.text}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                backgroundColor: location.pathname === item.path ? 'primary.light' : 'transparent',
                color: location.pathname === item.path ? 'white' : 'inherit',
                '& .MuiListItemIcon-root': {
                  color: location.pathname === item.path ? 'white' : 'inherit',
                },
              }}
            >
              <ListItemButton component={RouterLink} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            QazaQEduPlus
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to={item.path} 
                  key={item.text}
                  sx={{ 
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                    borderRadius: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderBottom: '2px solid white',
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  {/* Show role-specific navigation buttons */}
                  {isTeacher && teacherItems.map((item) => (
                    <Button 
                      key={item.text}
                      color="inherit" 
                      component={RouterLink} 
                      to={item.path}
                      sx={{ 
                        fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                        borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                        borderRadius: 0,
                        '&:hover': {
                          backgroundColor: 'transparent',
                          borderBottom: '2px solid white',
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                  
                  {isStudent && studentItems.map((item) => (
                    <Button 
                      key={item.text}
                      color="inherit" 
                      component={RouterLink} 
                      to={item.path}
                      sx={{ 
                        fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                        borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                        borderRadius: 0,
                        '&:hover': {
                          backgroundColor: 'transparent',
                          borderBottom: '2px solid white',
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                  
                  {/* Logout button */}
                  <Button 
                    color="inherit" 
                    variant="outlined" 
                    onClick={handleLogout}
                    sx={{ 
                      borderColor: 'white',
                      marginLeft: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white',
                      }
                    }}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    color="inherit" 
                    variant="outlined" 
                    component={RouterLink} 
                    to="/login"
                    sx={{ 
                      borderColor: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white',
                      }
                    }}
                  >
                    Войти
                  </Button>
                  <Button 
                    color="secondary" 
                    variant="contained" 
                    component={RouterLink} 
                    to="/register"
                  >
                    Регистрация
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto', 
          backgroundColor: 'primary.dark',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} QazaQEduPlus. Все права защищены.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
