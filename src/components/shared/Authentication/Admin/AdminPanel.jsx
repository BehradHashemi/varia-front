import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineArticle, MdPeople, MdSettings } from "react-icons/md";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userType === "admin") {
      setUser(storedUser);
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
        mb: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: theme.palette.error.main,
            mx: "auto",
            mb: 2,
          }}
        >
          {user?.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          پنل مدیریت
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={2}>
          {user?.email}
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          ادمین سایت
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<MdOutlineArticle style={{ marginLeft: "5px" }} />}
              onClick={() => navigate("/manage-blogs")}
              sx={{ py: 1.5 }}
            >
              مدیریت مقالات
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<MdPeople style={{ marginLeft: "5px" }} />}
              onClick={() => navigate("/manage-users")}
              sx={{ py: 1.5 }}
            >
              مدیریت کاربران
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              startIcon={<MdSettings style={{ marginLeft: "5px" }} />}
              onClick={() => navigate("/site-settings")}
              sx={{ py: 1.5 }}
            >
              تنظیمات سایت
            </Button>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<HiOutlineLogout style={{ marginLeft: "5px" }} />}
          onClick={handleLogout}
          sx={{ mt: 3, py: 1.5 }}
        >
          خروج از حساب
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminPanel;
