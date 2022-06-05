import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MoreIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch ,useSelector} from 'react-redux'
import { logout } from '../features/user';
const drawerWidth = 200;

const AppBars = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor:"#FF663F",
  color: 'white',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const PrimarySearchAppBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const state = useSelector(state => state.userInfo.value)

  const handleLogout = async (e) => {

    e.preventDefault();
    await axios.post(
      "http://localhost:8000/student/logout",{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
      }
    )
    .catch((err) =>{
      dispatch(logout())
      navigate("/")
    })
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} >ข้อมูลส่วนตัว</MenuItem>
      <MenuItem onClick={handleMenuClose}>เปลี่ยนรหัสผ่าน</MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (

    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {state.isStudent && (
        <>
        <MenuItem onClick={()=>navigate('/student/score')}>
        <IconButton size="large" color="inherit">
        </IconButton>
        <p>ตรวจสอบระดับคะแนน</p>
      </MenuItem>
     
      <MenuItem onClick={()=>navigate('/student/personnel')}>
        <IconButton
          size="large"
          color="inherit"
        >
        </IconButton>
        <p>ร้องเรียนอาจารย์</p>
      </MenuItem>
        </>
      )}
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>ข้อมูลส่วนตัว</p>
      </MenuItem>
    </Menu>

  );
  
  

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBars position="fixed" style={{backgroundColor: "#FF663F"}} open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            ยื่นคำร้อง
          </Typography>
          { state.isStudent ? (
            <>
            <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit" style={{marginLeft:60}} onClick={()=> navigate('/student/score')} >
            <Typography sx={{ minWidth: 100 }}>ตรวจสอบระดับคะแนน</Typography>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={() => navigate('/student/personnel')}>
              <Typography sx={{ minWidth: 100 }}>ร้องเรียนอาจารย์</Typography>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
           
          </Box>
        
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
            </>
          ):
          (
            <>
            <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
           
          </Box>
        
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
            </>
          ) }
          
        </Toolbar>
      </AppBars>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        PaperProps={{
            sx: {
                backgroundColor: "#FEF2E8",
                color:'black',
            }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <Typography>รายการยื่นคำร้อง</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>     
        </DrawerHeader>
        <Divider />
        <List>
          {['ตรวจสอบระดับคะแนน', 'ร้องเรียนอาจารย์'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} onClick={()=>{
                if(text === "ตรวจสอบระดับคะแนน"){
                  state.isStudent ? navigate('/student/petitionscore') : navigate('/personnel')
                }               
              }} />
            </ListItem>    
          ))}
        </List>
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    
  );
}

export default PrimarySearchAppBar;