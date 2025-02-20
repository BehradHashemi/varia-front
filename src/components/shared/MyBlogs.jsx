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
  CircularProgress,
} from "@mui/material";
import e2p from "../../utils/persianNumber";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const MyBlogs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error || !userData.user) {
        navigate("/dashboard");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, name, role")
        .eq("id", userData.user.id)
        .single();

      if (
        profileError ||
        (profile.role !== "writer" && profile.role !== "admin")
      ) {
        navigate("/dashboard");
        return;
      }

      setUser(profile);
      fetchArticles(profile.id);
    };
    fetchUser();
  }, [navigate]);

  const fetchArticles = async (userId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("VARIA-Blogs")
        .select("*")
        .eq("author_id", userId);

      if (error) throw error;
      setArticles(data);
    } catch (error) {
      console.error("خطا در دریافت وبلاگ:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, authorId) => {
    if (user.id !== authorId) {
      console.error("شما مجاز به حذف این مقاله نیستید!");
      return;
    }
    try {
      const { error } = await supabase
        .from("VARIA-Blogs")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchArticles(user.id);
    } catch (error) {
      console.error("خطا در حذف مقاله:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px auto",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        وبلاگ من
      </Typography>
      <Button
        variant="contained"
        color="success"
        sx={{ my: 2, borderRadius: "20px", fontWeight: "bold" }}
        onClick={() => navigate("/write-blog")}
      >
        مقاله جدید
      </Button>
      <br />
      {loading ? (
        <CircularProgress sx={{ my: "20px", mx: "auto" }} />
      ) : articles.length === 0 ? (
        <Typography color="textSecondary">
          هنوز هیچ مقاله‌ای ثبت نشده است.
        </Typography>
      ) : (
        <List>
          {articles.map((article) => (
            <ListItem
              key={article.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "right",
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                mb: 3,
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              {article.image && (
                <Avatar
                  variant="rounded"
                  src={article.image}
                  alt="article-img"
                  sx={{ width: "60%", height: 200, mb: 2, borderRadius: 3 }}
                />
              )}
              <Typography variant="h6" fontWeight="bold" color="#333">
                {article.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                {article.content.slice(0, 50)}...
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  mt: 2,
                }}
              >
                <Chip
                  label={e2p(article.date)}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={`نویسنده: ${article.author || "نامشخص"}`}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(article.id, article.author_id)}
                >
                  حذف مقاله
                </Button>
                {article.status === "rejected" && (
                  <Button variant="contained" color="warning">
                    ویرایش و ارسال مجدد
                  </Button>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyBlogs;
