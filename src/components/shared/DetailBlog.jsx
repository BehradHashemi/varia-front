import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import e2p from "../../utils/persianNumber";
import { createClient } from "@supabase/supabase-js";
import DOMPurify from "dompurify";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const DetailBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Fronck-Blogs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching blog:", error);
      } else {
        setBlog(data);
      }
    } catch (error) {
      console.error("خطا در دریافت مقالات:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container sx={{ mb: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: "#374BFF" }}>
          <IoMdArrowRoundBack />
        </IconButton>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", m: "auto" }}>
          <CircularProgress />
        </Box>
      ) : !blog ? (
        <>Nist</>
      ) : (
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
              color: "#333",
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          ></Typography>

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#374BFF", mb: 1 }}
            >
              برچسب‌ها:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {blog.tags.split("،").map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{ bgcolor: "#FF8B00", color: "#FFF" }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default DetailBlog;
