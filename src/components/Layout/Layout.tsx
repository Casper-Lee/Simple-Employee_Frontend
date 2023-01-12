import React, { Fragment } from "react";
import classes from "./Layout.module.css";
import Navbar from "../Navbar/Navbar"

const Layout = (props: any) => {
  return (
    <Fragment>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
