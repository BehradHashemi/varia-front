import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Button,
  Avatar,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  Grid,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { CheckCircle, Delete, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import e2p from "../../../../utils/persianNumber";
import { MdAdminPanelSettings, MdDashboard, MdPeople, MdSchool } from "react-icons/md";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ManageBlogs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) return navigate("/dashboard");

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, name, role,banned")
          .eq("id", data.user.id)
          .single();

        if (profileError || !profile || profile.role === "user") {
          return navigate("/dashboard");
        }

        setUser({
          id: data.user.id,
          author_id: profile.id,
          name: profile.name,
          role: profile.role,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/dashboard");
      }
    };
    fetchUser();
    fetchArticles();
  }, [navigate, filter]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let query = supabase.from("VARIA-Blogs").select("*");
      if (filter !== "all") {
        query = query.eq("status", filter);
      }
      const { data, error } = await query;
      if (error) throw error;
      setArticles(data);
    } catch (error) {
      console.error("خطا در دریافت وبلاگ:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from("VARIA-Blogs")
        .update({ status: "approved" })
        .eq("id", id);

      if (error) throw error;
      fetchArticles();
    } catch (error) {
      console.error("خطا در تایید مقاله:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const { error } = await supabase
        .from("VARIA-Blogs")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;
      fetchArticles();
    } catch (error) {
      console.error("خطا در رد مقاله:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("VARIA-Blogs")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchArticles();
    } catch (error) {
      console.error("خطا در حذف مقاله:", error);
    }
  };
  const menuItems = [
    {
      text: "داشبورد",
      icon: <MdDashboard />,
      path: "/dashboard",
    },
    {
      text: "مدیریت سایت",
      icon: <MdAdminPanelSettings />,
      path: "/admin-panel",
    },
    {
      text: "مدیرت کاربران",
      icon: <MdPeople />,
      path: "/manage-users",
    },
    {
      text: "مدیریت دوره ها",
      icon: <MdSchool />,
      path: "/manage-products",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
      }}
    >
      <Grid container spacing={2} sx={{ width: "100%", height: "100%" }}>
        <Grid item xs={12} md={3} sx={{ mr: "auto" }}>
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "10px",
              bgcolor: "#fff",
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
              مدریت وبلاگ
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
            <FormControl
              fullWidth
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">همه وبلاگ</MenuItem>
                <MenuItem value="approved">تایید شده</MenuItem>
                <MenuItem value="rejected">رد شده</MenuItem>
                <MenuItem value="pending">در انتظار تایید</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ textAlign: "center", borderRadius: "10px" }}>
            {loading ? (
              <Box
                sx={{ display: "flex", justifyContent: "center", m: "auto" }}
              >
                <CircularProgress />
              </Box>
            ) : articles.length === 0 ? (
              <Typography color="textSecondary">
                هیچ مقاله‌ای برای بررسی وجود ندارد.
              </Typography>
            ) : (
              <List sx={{ width: "100%" }}>
                {articles.map((article) => (
                  <>
                    <Box
                      sx={{ bgcolor: "#fff", borderRadius: 3 }}
                      key={article.id}
                    >
                      <ListItem
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          textAlign: "justify",
                          mb: 2,
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          sx={{ width: "100%" }}
                          onClick={() =>
                            navigate(`/manage-blogs/${article.id}`)
                          }
                        >
                          {article.image && (
                            <Avatar
                              variant="circular"
                              src={article.image}
                              alt="article-img"
                              sx={{
                                width: "100%",
                                maxWidth: isMobile ? "100%" : "60%",
                                height: isMobile ? "150px" : "250px",
                                borderRadius: 2,
                                objectFit: "cover",
                                m: "10px 0 20px",
                              }}
                            />
                          )}
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="#333"
                            sx={{
                              minHeight: "50px",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              overflow: "hidden",
                            }}
                          >
                            {article.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="#333"
                            mt={1}
                            lineHeight="30px"
                          >
                            {article.content.slice(0, 50)} ...
                          </Typography>
                          {article.tags && (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mt: 2,
                              }}
                            >
                              {article.tags.split("،").map((tag, index) => (
                                <Chip
                                  key={index}
                                  label={`# ${tag.trim()}`}
                                  variant="filled"
                                  sx={{ bgcolor: "#FF8B00", color: "#FFF" }}
                                />
                              ))}
                            </Box>
                          )}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              gap: { xs: 2, sm: 0 },
                              mt: 2,
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <Chip
                              label={e2p(article.date)}
                              color="primary"
                              variant="outlined"
                              sx={{ fontSize: "14px", fontWeight: "bold" }}
                            />
                            <Chip
                              label={`نویسنده: ${article.author}`}
                              color="secondary"
                              variant="outlined"
                              sx={{ fontSize: "14px", fontWeight: "bold" }}
                            />
                          </Box>
                          <Typography
                            variant="subtitle2"
                            color={
                              article.status === "approved"
                                ? "green"
                                : article.status === "rejected"
                                ? "red"
                                : "orange"
                            }
                            sx={{ mt: 1, fontWeight: "bold" }}
                          >
                            {article.status === "approved"
                              ? "تایید شده"
                              : article.status === "rejected"
                              ? "رد شده"
                              : "در انتظار تایید"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 2,
                            mt: 2,
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          {article.status === "pending" && (
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                startIcon={
                                  <CheckCircle style={{ marginLeft: "5px" }} />
                                }
                                onClick={() => handleApprove(article.id)}
                                sx={{
                                  px: 3,
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              >
                                تایید مقاله
                              </Button>
                              <Button
                                variant="contained"
                                color="warning"
                                startIcon={
                                  <Cancel style={{ marginLeft: "5px" }} />
                                }
                                onClick={() => handleReject(article.id)}
                                sx={{
                                  px: 3,
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              >
                                رد مقاله
                              </Button>
                            </>
                          )}
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<Delete style={{ marginLeft: "5px" }} />}
                            onClick={() => handleDelete(article.id)}
                            sx={{ px: 3, fontSize: "14px", fontWeight: "bold" }}
                          >
                            حذف مقاله
                          </Button>
                        </Box>
                      </ListItem>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                  </>
                ))}
              </List>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManageBlogs;
