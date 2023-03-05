import { useEffect } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../store/authContext'
import { getToken, removeAuthorizationToken, removeToken } from '../../store/handler';


function ResponsiveAppBar() {
  const { isAuthenticated, setAuthenticated } = useAuth();
  const history = useHistory();

  const checkAuthenticated = () => {
    const token = getToken()

    if(token){
      setAuthenticated(true)
    }else{
      setAuthenticated(false)
    }
  }

  // handle logout
  const handleLogout = () => {
    removeToken()
    removeAuthorizationToken()
    console.log('Pressed Logout!')
    checkAuthenticated()
    history.push("/login");
  };
  
  useEffect(() => {
    // redirect to dashboard if user is already logged in
    if (localStorage.getItem('token')) {
      history.push('/employee');
    }
  }, [history]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className={classes.navbar}>
          <Typography
            variant="h6"
            noWrap
            // component="a"
            // href="/employee"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontSize: "2rem",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Employees
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/employee"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Employees
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }} className={classes.buttonsection}>
            {isAuthenticated && (
              <NavLink to="/new-employee">
                <button className={classes.button}>
                  <AddCircleIcon className={classes.icon} />
                  ADD EMPLOYEE
                </button>
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink to="/login">
                <button className={classes.button} onClick={handleLogout}>
                  Logout
                </button>
              </NavLink>
            )}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <NavLink to="/new-employee">
              <button>
                <AddCircleIcon />
              </button>
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
