import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import e2p from "../../utils/persianNumber";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ojzkqlpghuyjazsitnic.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qemtxbHBnaHV5amF6c2l0bmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjcwOTAsImV4cCI6MjA1MzkwMzA5MH0.4ullxbHIL1BtAlbiVTUx7D3RWAFdLrMExKVQv2yNiqA"
);

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

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("Fronck-Blogs")
        .select("*")
        .eq("status", "approved"); // فقط مقالاتی که approved هستند را دریافت کنید
      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data);
      }
    };

    fetchBlogs();
  }, []);

  const allTags = useMemo(
    () => [...new Set(blogs.flatMap((blog) => blog.tags.split("،")))],
    [blogs]
  );

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag, blogs]);

  const handleSearchChange = useCallback(
    (e) => setSearchTerm(e.target.value),
    []
  );

  const handleTagChange = useCallback(
    (e) => setSelectedTag(e.target.value),
    []
  );

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
          fontSize: { xs: "2rem", sm: "3rem" },
        }}
      >
        مقالات
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <CacheProvider value={rtlCache}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="جستجو در مقالات..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={styles.searchInput}
          />

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
        </CacheProvider>
      </Box>

      <Grid container spacing={4}>
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Grid>
    </Container>
  );
};

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
        <CardActionArea component={Link} to={`/blogs/${blog.id}`}>
          <CardMedia
            component="img"
            height="200"
            image={blog.image}
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
              تاریخ انتشار: {e2p(blog.date)}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ color: "text.secondary", fontSize: "0.9rem" }}
            >
              {blog.content.slice(0, 50)}...
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {blog.tags.split("،").map((tag) => (
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
            to={`/blogs/${blog.id}`}
            variant="contained"
            size="small"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#374BFF",
              "&:hover": {
                bgcolor: "#2A3AC7",
                color: "#fff",
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
