import React, { useContext } from 'react'
import { Typography, AppBar, Toolbar, Button, Avatar, Box} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext.jsx';
import { logout } from '../api/api.js';

function PageHeader() {
  const navigateTo = useNavigate();
  const { authenticatedUser, updateAuthentication } = useContext(AuthContext);
  const authenticatedUserMock = {name:"ikhan", email:"", avatar:"https://picsum.photos/200"};

  const handleLogout = async () => {
    const response = await logout();
    console.log(`Headrer : logout response :${response}`);
    updateAuthentication(null);
  };
  const handleHistory = () => {
    navigateTo('/history');
  };
  return (
    <AppBar position="sticky" sx={{ width: '98vw' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button component={Link} to="/home" color="inherit">
            <img src="https://i.pinimg.com/originals/0b/73/51/0b7351f7b132512ea28fae9d5fff1bde.png" alt="Website Logo" height="60" />
          </Button>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {authenticatedUser.id !== '' ? (
          <>
            <Button color="inherit" onClick={handleHistory}>History</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <Avatar src={authenticatedUserMock.avatar}/>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit">Login</Button>
          </>
        )}
        </Toolbar>
      </AppBar>
  )
}

export default PageHeader;