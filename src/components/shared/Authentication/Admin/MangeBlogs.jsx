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
import { CheckCircle, Delete, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import e2p from "../../../../utils/persianNumber";

const ManageBlogs = () => {
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
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setArticles(savedBlogs);
  }, []);

  const handleApprove = (index) => {
    const updatedArticles = [...articles];
    updatedArticles[index].status = "approved";
    setArticles(updatedArticles);
    localStorage.setItem("blogs", JSON.stringify(updatedArticles));
  };

  const handleReject = (index) => {
    const updatedArticles = [...articles];
    updatedArticles[index].status = "rejected";
    setArticles(updatedArticles);
    localStorage.setItem("blogs", JSON.stringify(updatedArticles));
  };

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
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          color="#333"
          sx={{ borderBottom: "3px solid #1976d2", pb: 1 }}
        >
          مدیریت مقالات
        </Typography>
        {articles.length === 0 ? (
          <Typography color="textSecondary">
            هیچ مقاله‌ای برای بررسی وجود ندارد.
          </Typography>
        ) : (
          <List sx={{ width: "100%" }}>
            {articles.map((article, index) => (
              <>
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left",
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#f9f9f9",
                    mb: 2,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  {article.image && (
                    <Avatar
                      variant="rounded"
                      src={article.image}
                      alt="article-img"
                      sx={{
                        width: "100%",
                        height: 250,
                        mb: 2,
                        borderRadius: 2,
                      }}
                    />
                  )}
                  <Typography variant="h6" fontWeight="bold" color="#333">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    {article.content}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      maxWidth: "900px",
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
                      gap: 2,
                      mt: 2,
                      width: "100%",
                      justifyContent: "center",
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
                          onClick={() => handleApprove(index)}
                          sx={{ px: 3, fontSize: "14px", fontWeight: "bold" }}
                        >
                          تایید مقاله
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          startIcon={<Cancel style={{ marginLeft: "5px" }} />}
                          onClick={() => handleReject(index)}
                          sx={{ px: 3, fontSize: "14px", fontWeight: "bold" }}
                        >
                          رد مقاله
                        </Button>
                      </>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Delete style={{ marginLeft: "5px" }} />}
                      onClick={() => handleDelete(index)}
                      sx={{ px: 3, fontSize: "14px", fontWeight: "bold" }}
                    >
                      حذف مقاله
                    </Button>
                  </Box>
                </ListItem>
                {index !== articles.length - 1 && <Divider sx={{ my: 2 }} />}
              </>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default ManageBlogs;
