import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import img from "../../images/bits_logo.png";
const theme = createTheme({
  typography: {
    h5: {
      color: 'green'
    },
  }
});

export default function SelectRole() {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Avatar alt="Remy Sharp" src={img}  sx={{marginLeft:65, marginTop:10,  width: 86, height: 86 }} >
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5" sx={{marginLeft:58, marginTop:3 }}>
            BPHC Classroom
          </Typography>
        <Box
          sx={{
            border: 1,
            marginTop: 10,
            marginLeft: 30,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexGrow: 10,
            borderColor: 'primary.main',
            maxWidth: 680,
          }}
        >
        <Grid padding={10}>
            <Button variant="outlined" style={{textTransform : 'none', fontSize: '15px' }} href="/login">Login as Student</Button>
        </Grid>
        <Grid padding={10}>
          <Button variant="outlined" style={{textTransform : 'none' , fontSize: '15px'}} href="/profLogin">Login as Professor</Button>
        </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}