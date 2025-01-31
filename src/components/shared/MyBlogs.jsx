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
import e2p from "../../utils/persianNumber";

const MuBLogs = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setArticles(savedBlogs);
  }, []);

  const handleDelete = (index) => {
    const updatedArticles = articles.filter((_, i) => i !== index);
    setArticles(updatedArticles);
    localStorage.setItem("blogs", JSON.stringify(updatedArticles));
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
            {articles.map((article, index) => (
              <ListItem
                key={index}
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
                    onClick={() => handleDelete(index)}
                  >
                    حذف مقاله
                  </Button>
                  {article.status === "rejected" && (
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ alignSelf: "flex-end" }}
                      onClick={() => navigate("/write-blog")}
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

export default MuBLogs;
