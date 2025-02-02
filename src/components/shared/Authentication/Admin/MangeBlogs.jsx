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
} from "@mui/material";
import { CheckCircle, Delete, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import e2p from "../../../../utils/persianNumber";

const supabase = createClient(
  "https://ojzkqlpghuyjazsitnic.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qemtxbHBnaHV5amF6c2l0bmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjcwOTAsImV4cCI6MjA1MzkwMzA5MH0.4ullxbHIL1BtAlbiVTUx7D3RWAFdLrMExKVQv2yNiqA"
);

const ManageBlogs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userType === "admin") {
      setUser(storedUser);
      fetchArticles();
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase.from("Fronck-Blogs").select("*");
      if (error) throw error;
      setArticles(data);
    } catch (error) {
      console.error("خطا در دریافت مقالات:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from("Fronck-Blogs")
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
        .from("Fronck-Blogs")
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
        .from("Fronck-Blogs")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchArticles();
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
        justifyContent: "center",
        p: 1,
        mb: 2,
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
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          color="textPrimary"
          sx={{
            borderBottom: `3px solid ${theme.palette.primary.main}`,
            pb: 1,
          }}
        >
          مدیریت مقالات
        </Typography>
        {articles.length === 0 ? (
          <Typography color="textSecondary">
            هیچ مقاله‌ای برای بررسی وجود ندارد.
          </Typography>
        ) : (
          <List sx={{ width: "100%" }}>
            {articles.map((article) => (
              <React.Fragment key={article.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "justify",
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: theme.palette.action.hover,
                    mb: 2,
                    boxShadow: theme.shadows[2],
                    transition: "all 0.3s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  {article.image && (
                    <Avatar
                      variant="circular"
                      src={article.image}
                      alt="article-img"
                      sx={{
                        width: "60%",
                        height: isMobile ? 150 : 250,
                        mb: 2,
                        borderRadius: 2,
                        m: "auto",
                      }}
                    />
                  )}
                  <Typography variant="h6" fontWeight="bold" color="#333">
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    mt={1}
                    lineHeight="25px"
                  >
                    {article.content}
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
                          color="#00000080"
                          variant="outlined"
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
                          sx={{ px: 3, fontSize: "14px", fontWeight: "bold" }}
                        >
                          تایید مقاله
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          startIcon={<Cancel style={{ marginLeft: "5px" }} />}
                          onClick={() => handleReject(article.id)}
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
                      onClick={() => handleDelete(article.id)}
                      sx={{ px: 3, fontSize: "14px", fontWeight: "bold" }}
                    >
                      حذف مقاله
                    </Button>
                  </Box>
                </ListItem>
                <Divider sx={{ my: 2 }} />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default ManageBlogs;
