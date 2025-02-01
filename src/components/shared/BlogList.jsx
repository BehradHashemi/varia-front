import React, { useState, useMemo, useCallback } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Grid,
  CardActionArea,
  Chip,
  Avatar,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import blogs from "../../Data/Blog.json";

// استایل‌های مشترک
const styles = {
  searchInput: {
    flexGrow: 1,
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#FFF",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FF8B00",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#374BFF",
        borderWidth: "2px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "12px 16px",
    },
  },
  selectInput: {
    borderRadius: "12px",
    backgroundColor: "#FFF",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF8B00",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF8B00",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#374BFF",
      borderWidth: "2px",
    },
    "& .MuiSelect-select": {
      padding: "12px 16px",
    },
  },
};

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // استخراج تمام برچسب‌های منحصر به فرد
  const allTags = useMemo(
    () => [...new Set(blogs.Blogs.flatMap((blog) => blog.tags))],
    []
  );

  // فیلتر و مرتب‌سازی مقالات بر اساس جستجو و برچسب
  const filteredBlogs = useMemo(() => {
    return blogs.Blogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  // تغییر جستجو
  const handleSearchChange = useCallback(
    (e) => setSearchTerm(e.target.value),
    []
  );

  // تغییر برچسب
  const handleTagChange = useCallback(
    (e) => setSelectedTag(e.target.value),
    []
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      {/* عنوان صفحه */}
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
          color: "#374BFF",
          fontSize: { xs: "2rem", sm: "3rem" },
        }}
      >
        مقالات
      </Typography>

      {/* باکس جستجو و مرتب‌سازی */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {/* باکس جستجو */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="جستجو در مقالات..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={styles.searchInput}
        />

        {/* مرتب‌سازی بر اساس برچسب */}
        <FormControl fullWidth sx={{ minWidth: 200 }}>
          <InputLabel
            sx={{
              color: "#374BFF",
              "&.Mui-focused": {
                color: "#374BFF",
              },
            }}
          >
            مرتب‌سازی بر اساس برچسب
          </InputLabel>
          <Select
            value={selectedTag}
            onChange={handleTagChange}
            label="مرتب‌سازی بر اساس برچسب"
            sx={styles.selectInput}
          >
            <MenuItem value="">همه مقالات</MenuItem>
            {allTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* لیست مقالات */}
      <Grid container spacing={4}>
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Grid>
    </Container>
  );
};

// کامپوننت BlogCard برای جلوگیری از رندرهای غیرضروری
const BlogCard = React.memo(({ blog }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          },
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardActionArea component={Link} to={`/article/${blog.id}`}>
          <CardMedia
            component="img"
            height="200"
            image={blog.cover}
            alt={blog.title}
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#374BFF" }}
            >
              {blog.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#FF8B00" }}>
                {blog.author[0]}
              </Avatar>
              <Typography variant="body2" color="textSecondary">
                {blog.author}
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              تاریخ انتشار: {blog.date}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ color: "text.secondary", fontSize: "0.9rem" }}
            >
              {blog.description.slice(0, 100)}... {/* نمایش خلاصه مقاله */}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {blog.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: "#FF8B00",
                    color: "#FFF",
                    borderRadius: "8px",
                    fontSize: "0.7rem",
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            component={Link}
            to={`/article/${blog.id}`}
            variant="contained"
            size="small"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#374BFF",
              "&:hover": {
                bgcolor: "#2A3AC7",
              },
            }}
          >
            مطالعه بیشتر
          </Button>
        </Box>
      </Card>
    </Grid>
  );
});

export default BlogList;
