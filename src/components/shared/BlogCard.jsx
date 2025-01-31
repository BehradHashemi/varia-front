import React from "react";
import { Card, CardContent, CardMedia, Button, Box, Grid, Avatar, Typography, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import e2p from "../../utils/persianNumber";

const BlogCard = ({ blog }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
          },
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <CardMedia
            component="img"
            height="180"
            image={blog.cover}
            alt={blog.title}
            loading="lazy"
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", color: "#374BFF" }}>
              {blog.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#FF8B00" }}>{blog.author[0]}</Avatar>
              <Typography variant="body2" color="textSecondary">
                {blog.author}
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              تاریخ انتشار: {e2p(blog.date)}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "0.9rem", mt: 1 }}>
              {blog.description.slice(0, 60)}...
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
              {blog.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "#FF8B00", color: "#FFF", borderRadius: "8px", fontSize: "0.7rem" }} />
              ))}
            </Box>
          </CardContent>
        </Link>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-start" }}>
          <Button
            component={Link}
            to={`/blogs/${blog.id}`}
            variant="contained"
            size="small"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#374BFF",
              "&:hover": { bgcolor: "#2A3AC7", color: "#fff" },
            }}
          >
            مطالعه بیشتر
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default React.memo(BlogCard);
