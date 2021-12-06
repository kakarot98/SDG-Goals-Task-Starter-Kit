import React from "react";
import {Toolbar, Button} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Goal from "./goal";
import Year from "./year";
import Filters from './filters'

const Appbar = () => {
  return (
    <AppBar position="static" style={{ height: "100%", width: "100%" }}>
      <Toolbar>
        <Goal />
        <Year />
        <Filters />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
