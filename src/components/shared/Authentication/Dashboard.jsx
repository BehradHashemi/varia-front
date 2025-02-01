import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import {
  MdOutlineArticle,
  MdShoppingCart,
  MdAdminPanelSettings,
  MdCreate,
} from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "15px auto",
        p: 1,
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
        }}
      >
        <Avatar sx={{ width: 80, height: 80, bgcolor: "#374BFF", mx: "auto" }}>
          {user?.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h4" fontWeight="bold" mt={2}>
          {user?.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mt={1}>
          {user?.email}
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={1}>
          نقش:{" "}
          {user?.userType === "admin"
            ? "ادمین"
            : user?.userType === "writer"
            ? "نویسنده"
            : "کاربر عادی"}
        </Typography>

        <Grid container spacing={2} mt={3}>
          {user?.userType === "admin" && (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                startIcon={
                  <MdAdminPanelSettings style={{ marginLeft: "4px" }} />
                }
                onClick={() => navigate("/admin-panel")}
              >
                مدیریت سایت
              </Button>
            </Grid>
          )}
          {user?.userType === "writer" && (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                startIcon={<MdCreate style={{ marginLeft: "4px" }} />}
                onClick={() => navigate("/write-blog")}
              >
                نوشتن مقاله جدید
              </Button>
            </Grid>
          )}
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<MdOutlineArticle style={{ marginLeft: "4px" }} />}
              onClick={() => navigate("/my-blogs")}
            >
              مقالات من
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<MdShoppingCart style={{ marginLeft: "4px" }} />}
              onClick={() => navigate("/cart")}
            >
              خریدهای من
            </Button>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<HiOutlineLogout style={{ marginLeft: "4px" }} />}
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          خروج از حساب
        </Button>
      </Paper>
    </Box>
  );
};

export default Dashboard;