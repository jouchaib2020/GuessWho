import React, { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../utils/AuthContext.jsx";
import styled from '@emotion/styled';
import { Typography, TextField, Button } from '@mui/material';
import Header from '../components/Header.jsx';
import { login } from "../api/api.js";

const useStyles = styled((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign:'center',
  },
  form: {
    width: '100%',
    maxWidth: 300,
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
  }
}));

const LoginPage = () => {
  const navigateTo = useNavigate();
  const { authenticatedUser, updateAuthentication } = useContext(AuthContext);
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      const user = response.user
      updateAuthentication(user)
      navigateTo('/home')
      console.log(` LogiPage: login response user :${response.user}`);
    } catch (error) {
      // Handle login error
      setErrorMessage('Invalid email or password');
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <Header />
      <Typography variant="h4" style={{textAlign:'center', padding:'2%'}}>
        Login
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Login
        </Button>
        {errorMessage && (
          <Typography variant="body2" className={classes.errorMessage}>
            {errorMessage}
          </Typography>
        )}
      </form>
    </div>
  );
};

export default LoginPage;