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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import e2p from "../../utils/persianNumber";

const supabase = createClient(
  "https://ojzkqlpghuyjazsitnic.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qemtxbHBnaHV5amF6c2l0bmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjcwOTAsImV4cCI6MjA1MzkwMzA5MH0.4ullxbHIL1BtAlbiVTUx7D3RWAFdLrMExKVQv2yNiqA"
);

const MyBlogs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored User:", storedUser); // Debugging
    if (storedUser?.userType === "writer" || storedUser?.userType === "admin") {
      setUser(storedUser);
      if (storedUser.id) {
        console.log("User ID:", storedUser.id); // Debugging
        fetchArticles(storedUser.id);
      } else {
        console.error("User ID is missing in the stored user object.");
      }
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  const fetchArticles = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("Fronck-Blogs") // Ensure the table name is correct
        .select("*")
        .eq("author_id", userId); // Ensure the column name is correct
      if (error) throw error;
      setArticles(data);
    } catch (error) {
      console.error("خطا در دریافت مقالات:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("Fronck-Blogs").delete().eq("id", id);
      if (error) throw error;
      fetchArticles(user.id); // Refresh the list after deletion
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
          maxWidth: "900px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} color="#333">
          مقالات من
        </Typography>
        {articles.length === 0 ? (
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
                  textAlign: "left",
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "white",
                  mb: 2,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                {article.image && (
                  <Avatar
                    variant="rounded"
                    src={article.image}
                    alt="article-img"
                    sx={{ width: "100%", height: 200, mb: 2, borderRadius: 2 }}
                  />
                )}
                <Typography variant="h6" fontWeight="bold" color="#333">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  {article.content.slice(0, 80)}...
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
                    sx={{ alignSelf: "flex-end" }}
                    onClick={() => handleDelete(article.id)}
                  >
                    حذف مقاله
                  </Button>
                  {article.status === "rejected" && (
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ alignSelf: "flex-end" }}
                      onClick={() => navigate(`/write-blog/${article.id}`)}
                    >
                      ویرایش و ارسال مجدد
                    </Button>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/write-blog")}
        >
          مقاله جدید
        </Button>
      </Paper>
    </Box>
  );
};

export default MyBlogs;