import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment-jalaali";
import e2p from "../../../utils/persianNumber";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const WriteBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    tags: "",
    author: "",
    date: moment().format("jYYYY/jMM/jDD"),
    image: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlog({ ...blog, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!blog.title || !blog.content || !blog.author) {
      toast.error("تمام فیلدهای الزامی باید پر شوند.", {
        position: "top-center",
      });
      return;
    }

    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    savedBlogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(savedBlogs));

    toast.success("مقاله در انتظار تایید قرار گرفت.", {
      position: "top-center",
    });
    setTimeout(() => navigate("/my-blogs"), 2000);
  };

  return (
    <CacheProvider value={rtlCache}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "15px auto",
          p: 1,
        }}
      >
        <ToastContainer rtl />
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={3}>
            نوشتن مقاله جدید
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="عنوان مقاله"
              variant="outlined"
              name="title"
              value={blog.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="نام نویسنده"
              variant="outlined"
              name="author"
              value={blog.author}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="برچسب‌ها (با کاما جدا کنید)"
              variant="outlined"
              name="tags"
              value={blog.tags}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="متن مقاله"
              variant="outlined"
              name="content"
              value={blog.content}
              onChange={handleChange}
              fullWidth
              multiline
              rows={5}
            />
            <Typography variant="subtitle1" color="textSecondary">
              تاریخ انتشار: {e2p(blog.date)}
            </Typography>
            <Button variant="contained" component="label">
              آپلود تصویر
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            {blog.image && (
              <img
                src={blog.image}
                alt="Preview"
                style={{ width: "100%", marginTop: 10, borderRadius: 5 }}
              />
            )}
            <Button type="submit" variant="contained" color="success">
              ذخیره مقاله
            </Button>
          </Box>
        </Paper>
      </Box>
    </CacheProvider>
  );
};

export default WriteBlog;
