import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Avatar,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import blogs from "../../Data/Blog.json";
import e2p from "../../utils/persianNumber";

const DetailBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.Blogs.find((blog) => blog.id === parseInt(id));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!blog) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4">مقاله یافت نشد!</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: "#374BFF" }}>
          <IoMdArrowRoundBack />
        </IconButton>
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 3 : 6,
          borderRadius: "16px",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{ fontWeight: "bold", color: "#374BFF", mb: 3 }}
        >
          {blog.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: "#FF8B00" }}>
            {blog.author[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {blog.author}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              تاریخ انتشار: {e2p(blog.date)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            textAlign: "justify",
            color: "text.secondary",
          }}
        >
          {blog.description}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#374BFF", mb: 1 }}
          >
            برچسب‌ها:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {blog.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{ bgcolor: "#FF8B00", color: "#FFF" }}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default DetailBlog;
