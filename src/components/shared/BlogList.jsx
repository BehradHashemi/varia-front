import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Avatar,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import blogs from "../../Data/Blog.json";

const BlogCard = lazy(() => import("./BlogCard"));

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const allTags = useMemo(
    () => [...new Set(blogs.Blogs.flatMap((blog) => blog.tags))],
    []
  );

  const filteredBlogs = useMemo(() => {
    return blogs.Blogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
          color: "#374BFF",
        }}
      >
        مقالات
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="جستجو در مقالات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "12px",
              backgroundColor: "#FFF",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
        />

        <FormControl fullWidth sx={{ minWidth: 200 }}>
          <InputLabel>فیلتر کردن مقالات</InputLabel>
          <Select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            sx={{
              borderRadius: "12px",
              backgroundColor: "#FFF",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
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

      <Grid container spacing={3}>
        <Suspense fallback={<div>در حال بارگذاری...</div>}>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </Suspense>
      </Grid>
    </Container>
  );
};

export default BlogList;
