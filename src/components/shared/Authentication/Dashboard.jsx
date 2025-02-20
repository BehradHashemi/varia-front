import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  TextField,
} from "@mui/material";
import { HiOutlineLogout } from "react-icons/hi";
import {
  MdOutlineArticle,
  MdShoppingCart,
  MdAdminPanelSettings,
  MdCreate,
} from "react-icons/md";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

import moment from "moment-jalaali";
import e2p from "../../../utils/persianNumber";

import { useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [newName, setNewName] = useState(user?.name || "");
  const [updating, setUpdating] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: userData, error: authError } =
          await supabase.auth.getUser();

        if (authError || !userData.user) {
          navigate("/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("name, role, created_at, lastsignin_at")
          .eq("id", userData.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile error:", profileError);
          navigate("/login");
          return;
        }

        setUser({
          ...userData.user,
          name: profile.name || "بی‌نام",
          role: profile.role || "user",
        });
      } catch (error) {
        console.error("Dashboard error:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchBlogs();
  }, [navigate]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("VARIA-Blogs")
        .select("*")
        .eq("status", "approved");
      if (error) {
        throw error;
      } else {
        setBlogs(data);
      }
    } catch (error) {
      toast.error("خطا در دریافت وبلاگ!");
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = async () => {
    if (!newName.trim() || newName === user?.name) return;

    setUpdating(true);
    const { error } = await supabase
      .from("profiles")
      .update({ name: newName })
      .eq("id", user.id);

    if (error) {
      console.error("خطا در تغییر نام:", error);
    } else {
      setUser((prevUser) => ({ ...prevUser, name: newName }));
    }

    setUpdating(false);
  };

  const getMenuItems = () => {
    const baseItems = [
      { text: "وبلاگ من", icon: <MdOutlineArticle />, path: "/my-blogs" },
      { text: "خریدهای من", icon: <MdShoppingCart />, path: "/cart" },
    ];

    if (user?.role === "writer" || user?.role === "admin") {
      baseItems.unshift({
        text: "نوشتن مقاله",
        icon: <MdCreate />,
        path: "/write-blog",
      });
    }

    if (user?.role === "admin") {
      baseItems.unshift({
        text: "مدیریت سایت",
        icon: <MdAdminPanelSettings />,
        path: "/admin-panel",
      });
    }

    return baseItems;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    navigate("/login");
  };

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
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                height: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "primary.main",
                  textAlign: "center",
                }}
              >
                پنل کاربری
              </Typography>
              <List component="nav">
                {getMenuItems().map((item, index) => (
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
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        variant: "body1",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<HiOutlineLogout style={{ marginLeft: "5px" }} />}
                onClick={handleLogout}
                sx={{ mt: 3, py: 1.5, borderRadius: "12px", fontWeight: 600 }}
              >
                خروج از حساب
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                height: "100%",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                {user?.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user?.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  color:
                    user?.role === "admin" ? "error.main" : "text.secondary",
                  fontWeight: 500,
                }}
              >
                نقش:{" "}
                {user?.role === "admin"
                  ? "مدیر سیستم"
                  : user?.role === "writer"
                  ? "نویسنده"
                  : "کاربر عادی"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                تاریخ عضویت:
                {e2p(
                  moment(user?.created_at).locale("fa").format("jYYYY/jMM/jDD")
                )}
              </Typography>

              <Typography variant="body1" color="textSecondary">
                مدت عضویت:{" "}
                {e2p(
                  moment().diff(
                    moment(user?.created_at, "YYYY-MM-DD HH:mm:ss"),
                    "days"
                  )
                )}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                آخرین حضور:{" "}
                
                {e2p(
                  moment(user?.lastsignin_at).locale("fa").format("jYYYY/jMM/jDD")
                )}
              </Typography>
              {user?.role === "admin" ? (
                <Box
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    pt: 2,
                    mt: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    آمار فعالیت‌ها
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: "center" }}>
                        <Typography variant="body2">
                          وبلاگ منتشر شده
                        </Typography>
                        <Typography variant="h5" fontWeight={700}>
                          {blogs.length == 0 ? "-" : e2p(blogs.length)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: "center" }}>
                        <Typography variant="body2">
                          خریدهای انجام شده
                        </Typography>
                        <Typography variant="h5" fontWeight={700}>
                          -
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    pt: 2,
                    mt: 1,
                  }}
                >
                  <CacheProvider value={rtlCache}>
                    <TextField
                      label="ویرایش نام"
                      variant="outlined"
                      fullWidth
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      sx={{
                        textAlign: "center",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                  </CacheProvider>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleNameChange}
                    disabled={updating || newName.trim() === user?.name}
                    sx={{ mt: 2, borderRadius: "12px" }}
                  >
                    {updating ? (
                      <CircularProgress size={24} />
                    ) : (
                      "ذخیره تغییرات"
                    )}
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{ mt: 2, fontWeight: "700" }}
                    color="error.main"
                  >
                    تغییر ایمیل از طریق ارتباط با پشتیبانی امکان پذیر است
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
