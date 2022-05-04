import * as React from 'react';
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


const theme = createTheme({
  typography: {
    h5: {
      color: 'blue'
    },
  }
});

export default function SignUp() {

  const [id, setId] = useState('');
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const idChangeHandler = (event) => {
    setId(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(email);

    axios.post(
      "http://localhost:8080/student/signup",
        {
          "name" : name,
          "password" : password,
          "email" : email,
          "studentId" : id
      }
      )
    .then(res => { 
      console.log(res);
      window.location.href = "/login";
    })
    .catch(err => {
      alert(err);
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="Student ID"
              name="id"
              autoComplete="id"
              autoFocus
              onChange={idChangeHandler}
            />
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={nameChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={emailChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordChangeHandler}

              type={showPassword ? "text" : "password"}
              InputProps={{ 
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              onChange={confirmPasswordChangeHandler}

              type={showConfirmPassword ? "text" : "password"}
              InputProps={{ 
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControl>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
    </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          
        </Box>
      </Container>
    </ThemeProvider>
  );
}