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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineArticle,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const AdminPanel = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const checkAdminAccess = async () => {
      setLoading(true);
      const { data: userData, error } = await supabase.auth.getUser();

      if (error || !userData?.user) {
        console.log("Auth Error:", error);
        navigate("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", userData.user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        console.log("Profile Fetch Error:", profileError);
        navigate("/dashboard");
        return;
      }

      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
      setLoading(false);
    };

    checkAdminAccess();
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
      text: "مدیریت کاربران",
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
        mb: 5,
        p: 1,
        width: "100%",
        overflowX: "none",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center", borderRadius: "10px" }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "primary.main",
                  textAlign: "center",
                }}
              >
                پنل ادمین
              </Typography>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* اطلاعات کاربر */}
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
                  {user?.name?.charAt(0).toUpperCase() || "A"}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {user?.name || "ادمین"}
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
      )}
    </Box>
  );
};

export default AdminPanel;
