import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { MdDashboard, MdPeople, MdArticle, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      sx={{
        direction: "rtl",
        width: "100%",
        backgroundColor: "#fff",
        color: "#000",
        py: 2,
        px: 1,
        my: 2,
        borderRadius: 2,
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <MdDashboard color={"#000"} />
          </ListItemIcon>
          <ListItemText primary="داشبورد" />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        <ListItem button component={Link} to="/manage-users">
          <ListItemIcon>
            <MdPeople color={"#000"} />
          </ListItemIcon>
          <ListItemText primary="مدیریت کاربران" />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        <ListItem button component={Link} to="/manage-blogs">
          <ListItemIcon>
            <MdArticle color={"#000"} />
          </ListItemIcon>
          <ListItemText primary="وبلاگ" />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        <ListItem button component={Link} to="/site-settings">
          <ListItemIcon>
            <MdSettings color={"#000"} />
          </ListItemIcon>
          <ListItemText primary="تنظیمات" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
