import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Avatar,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineArticle,
  MdPeople,
  MdSettings,
} from "react-icons/md";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userType === "admin") {
      setUser(storedUser);
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  const menuItems = [
    {
      text: "داشبورد",
      icon: <MdDashboard />,
      path: "/dashboard",
    },
    {
      text: "تنظیمات سایت",
      icon: <MdSettings />,
      path: "/site-settings",
    },
    {
      text: "مدیریت مقالات",
      icon: <MdOutlineArticle />,
      path: "/manage-blogs",
    },
    {
      text: "مدیرت کاربران",
      icon: <MdPeople />,
      path: "/manage-users",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 5,
        height: "100%",
      }}
    >
      <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center", borderRadius: "10px" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              پنل ادمین
            </Typography>
            <List>
              {menuItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 4,
              textAlign: "right",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: theme.palette.error.main,
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {user?.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {user?.email}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  ادمین سایت
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPanel;
