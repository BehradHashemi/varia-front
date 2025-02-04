import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment-jalaali";
import e2p from "../../../utils/persianNumber";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ojzkqlpghuyjazsitnic.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qemtxbHBnaHV5amF6c2l0bmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjcwOTAsImV4cCI6MjA1MzkwMzA5MH0.4ullxbHIL1BtAlbiVTUx7D3RWAFdLrMExKVQv2yNiqA"
);

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userType === "writer" || storedUser?.userType === "admin") {
      setUser(storedUser);
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog.title || !blog.content || !blog.author) {
      toast.error("تمام فیلدهای الزامی باید پر شوند.", {
        position: "top-center",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Fronck-Blogs")
        .insert([blog])
        .select();

      if (error) throw error;

      toast.success("مقاله در انتظار تایید قرار گرفت.", {
        position: "top-center",
      });
      setTimeout(() => navigate("/my-blogs"), 2000);
    } catch (error) {
      toast.error("خطا در ذخیره مقاله!", {
        position: "top-center",
      });
    }
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
      <ToastContainer rtl />
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
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
          <CacheProvider value={rtlCache}>
            <TextField
              label="عنوان مقاله"
              variant="outlined"
              name="title"
              value={blog.title}
              onChange={handleChange}
              fullWidth
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="نام نویسنده"
              variant="outlined"
              name="author"
              value={blog.author}
              onChange={handleChange}
              fullWidth
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="برچسب‌ها (با کاما جدا کنید)"
              variant="outlined"
              name="tags"
              value={blog.tags}
              onChange={handleChange}
              fullWidth
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </CacheProvider>
          <TextField
            dir="ltr"
            label="متن مقاله"
            variant="outlined"
            name="content"
            value={blog.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={30}
            sx={{
              textAlign: "right",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
          <Typography variant="subtitle1" color="textSecondary">
            تاریخ انتشار: {e2p(blog.date)}
          </Typography>

          {blog.image && (
            <img
              src={blog.image}
              alt="Preview"
              style={{ width: "65%", margin: "auto", borderRadius: 5 }}
            />
          )}
          <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
            <Button variant="contained" component="label" sx={{ width: "100%" }}>
              آپلود تصویر
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            <Button type="submit" variant="contained" color="success" sx={{ width: "40%" }}>
              ذخیره مقاله
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default WriteBlog;
