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
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import e2p from "../../utils/persianNumber";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("VARIA-Blogs")
        .select("*")
        .eq("status", "approved");
      if (error) {
        throw error;
      } else {
        setBlogs(data);
      }
    } catch (error) {
      toast.error("خطا در دریافت وبلاگ!");
    } finally {
      setLoading(false);
    }
  };

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

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  return (
    <Container>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
          color: "#374BFF",
          fontSize: { xs: "2rem", sm: "3rem" },
        }}
      >
        وبلاگ
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
      >
        <CacheProvider value={rtlCache}>
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              sx={{
                flexGrow: 1,
                borderRadius: "12px",
                backgroundColor: "#FFF",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MenuItem value="newest">جدیدترین</MenuItem>
              <MenuItem value="oldest">قدیمی‌ترین</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              sx={{
                flexGrow: 1,
                borderRadius: "12px",
                backgroundColor: "#FFF",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              startAdornment={<TuneIcon sx={{ color: "#999", mr: 1 }} />}
            >
              <MenuItem value="">همه وبلاگ</MenuItem>
              {allTags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="جستجو در وبلاگ..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#FFF",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#999", ml: 1 }} />,
            }}
          />
        </CacheProvider>
      </Box>

      <Grid container spacing={1} sx={{ mb: 4 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", m: "auto" }}>
            <CircularProgress />
          </Box>
        ) : (
          currentBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", my: 3, gap: 2 }}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="contained"
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: "#374BFF",
            color: "#fff",
            "&:hover": { bgcolor: "#2A3AC7" },
            "&:disabled": { bgcolor: "#ccc", color: "#666" },
          }}
        >
          قبلی
        </Button>

        <Typography
          sx={{
            mx: 2,
            px: 2,
            py: 1,
            borderRadius: "8px",
            bgcolor: "#f1f1f1",
            fontWeight: "bold",
          }}
        >
          {e2p(currentPage)} از {e2p(totalPages)}
        </Typography>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="contained"
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: "#374BFF",
            color: "#fff",
            "&:hover": { bgcolor: "#2A3AC7" },
            "&:disabled": { bgcolor: "#ccc", color: "#666" },
          }}
        >
          بعدی
        </Button>
      </Box>
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
          justifyContent: "space-between",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
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
          <CardContent
            sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#374BFF",
                minHeight: "50px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
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
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 1 }}>
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
