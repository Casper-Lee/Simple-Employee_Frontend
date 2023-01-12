import React, { useCallback, useEffect } from "react";
import{Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/Homepage";
import EditEmployee from "./pages/EditEmployee";
import CreateEmployee from "./pages/CreateEmployee";
import { getAllEmployees } from "./store/employeeSlice";
import { useAppDispatch } from "./store/store";

function App() {
  const dispatch = useAppDispatch()

  const initApp = useCallback(async() => {
    await dispatch(getAllEmployees())
  }, [dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

  return (
    <Layout>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/employee'/>
          </Route>
          <Route exact path="/employee" > 
          <Homepage />
          </Route>
          <Route path='/employee/:employeeId'>
          <EditEmployee />
          </Route>
          <Route path='/new-employee'>
            <CreateEmployee />
          </Route>
        </Switch>
    </Layout>
  );
}

export default App;
