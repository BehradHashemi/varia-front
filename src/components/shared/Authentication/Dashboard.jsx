import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Paper,
  useMediaQuery,
  Drawer,
  IconButton,
} from "@mui/material";
import { HiOutlineLogout } from "react-icons/hi";
import {
  MdOutlineArticle,
  MdShoppingCart,
  MdAdminPanelSettings,
  MdCreate,
  MdDashboard,
  MdMenu,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { text: "مقالات من", icon: <MdOutlineArticle />, path: "/my-blogs" },
    { text: "خریدهای من", icon: <MdShoppingCart />, path: "/cart" },
  ];

  if (user?.userType !== "user") {
    menuItems.unshift({
      text: "نوشتن مقاله",
      icon: <MdCreate />,
      path: "/write-blog",
    });
  }
  if (user?.userType === "admin") {
    menuItems.unshift({
      text: "مدیریت سایت",
      icon: <MdAdminPanelSettings />,
      path: "/admin-panel",
    });
  }

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
              پنل کاربری
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
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<HiOutlineLogout style={{ marginLeft: "5px" }} />}
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              خروج از حساب
            </Button>
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
                  bgcolor: theme.palette.primary.main,
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
                  نقش:{" "}
                  {user?.userType === "admin"
                    ? "ادمین"
                    : user?.userType === "writer"
                    ? "نویسنده"
                    : "کاربر عادی"}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
