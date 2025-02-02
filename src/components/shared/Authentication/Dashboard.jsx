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
import {
  MdOutlineArticle,
  MdShoppingCart,
  MdAdminPanelSettings,
  MdCreate,
} from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
            bgcolor: theme.palette.primary.main,
            mx: "auto",
            mb: 2,
          }}
        >
          {user?.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {user?.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={2}>
          {user?.email}
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          نقش:{" "}
          {user?.userType === "admin"
            ? "ادمین"
            : user?.userType === "writer"
            ? "نویسنده"
            : "کاربر عادی"}
        </Typography>

        <Grid container spacing={2}>
          {user?.userType === "admin" && (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                startIcon={
                  <MdAdminPanelSettings style={{ marginLeft: "5px" }} />
                }
                onClick={() => navigate("/admin-panel")}
                sx={{ py: 1.5 }}
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
                startIcon={<MdCreate style={{ marginLeft: "5px" }} />}
                onClick={() => navigate("/write-blog")}
                sx={{ py: 1.5 }}
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
              startIcon={<MdOutlineArticle style={{ marginLeft: "5px" }} />}
              onClick={() => navigate("/my-blogs")}
              sx={{ py: 1.5 }}
            >
              مقالات من
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<MdShoppingCart style={{ marginLeft: "5px" }} />}
              onClick={() => navigate("/cart")}
              sx={{ py: 1.5 }}
            >
              خریدهای من
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

export default Dashboard;
