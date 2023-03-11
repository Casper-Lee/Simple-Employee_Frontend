import { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import Errorpage from "./pages/Error/Errorpage";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Login/Loginpage";
import Signuppage from "./pages/Signup/Signuppage";
import { AuthProvider } from "./store/authContext";
import { getToken } from "./store/handler";
import { useAppDispatch } from "./store/store";

// const allowAccess = {
//   "HOMEPAGE" : false,
//   "SIGNUP" : false,
//   "EMPLOYEES" : true,
//   "CREATEEMPLOYEES": true,
//   "EDITEMPLOYEES" : true
// }

function App() {
  // const initApp = useCallback(async () => {
  //   await dispatch(getAllEmployees());
  // }, [dispatch]);

  // useEffect(() => {
  //   initApp();
  // }, [initApp]);

  // const token = getToken()
  // if (!token) {
  //   // redirect to login page
  //   history.push('/login');
  // }

  return (
    <AuthProvider>
    <Layout>
      <Switch>
        <Route path="/" exact >
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
            <Loginpage/>
        </Route>
        <Route path="/signup">
         <Signuppage />
        </Route>
        <Route path="/employee">
          <Homepage />
        </Route>
        <Route path="/employee/:employeeId">
          <EditEmployee />
        </Route>
        <Route path="/new-employee">
          <CreateEmployee />
        </Route>
        <Route path="/error">
          <Errorpage />
        </Route>
      </Switch>
    </Layout>
    </AuthProvider>
  );
}

export default App;
