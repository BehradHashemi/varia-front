import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineArticle, MdPeople, MdSettings } from "react-icons/md";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
        direction: "rtl",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <Avatar sx={{ width: 80, height: 80, bgcolor: "#D32F2F", mx: "auto" }}>
          {user?.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h4" fontWeight="bold" mt={2}>
          پنل مدیریت
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mt={1}>
          {user?.email}
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={1}>
          ادمین سایت
        </Typography>

        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<MdOutlineArticle />}
              onClick={() => navigate("/manage-articles")}
            >
              مدیریت مقالات
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<MdPeople />}
              onClick={() => navigate("/manage-users")}
            >
              مدیریت کاربران
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              startIcon={<MdSettings />}
              onClick={() => navigate("/site-settings")}
            >
              تنظیمات سایت
            </Button>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<HiOutlineLogout />}
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          خروج از حساب
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminPanel;
