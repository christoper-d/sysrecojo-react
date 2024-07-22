import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";


const MainComponent = () => {
  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '90autvh', backgroundColor: '#0d1117'}}>
        {/* <Sidebar/> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainComponent;
