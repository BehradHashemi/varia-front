import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Chip,
  Paper,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import { createClient } from "@supabase/supabase-js";
import e2p from "../../../../utils/persianNumber";
const supabase = createClient(
  "https://ojzkqlpghuyjazsitnic.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qemtxbHBnaHV5amF6c2l0bmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjcwOTAsImV4cCI6MjA1MzkwMzA5MH0.4ullxbHIL1BtAlbiVTUx7D3RWAFdLrMExKVQv2yNiqA"
);

const ManageDetailBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("Fronck-Blogs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching article:", error);
      } else {
        setArticle(data);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center" }}>
      <Button
        endIcon={<ArrowBack style={{ marginRight: "5px" }} />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        بازگشت
      </Button>
      {loading ? (
        <CircularProgress />
      ) : !article ? (
        <Typography textAlign="center">مقاله‌ای یافت نشد</Typography>
      ) : (
        <Paper sx={{ p: 3, borderRadius: "12px" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {article.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ textAlign: "center", mb: 2 }}
          >
            نویسنده: {article.author} | تاریخ انتشار: {e2p(article.date)}
          </Typography>
          {article.tags && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 3 }}>
              {article.tags.split(",").map((tag, index) => (
                <Chip
                  key={index}
                  label={`# ${tag.trim()}`}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          )}
          {article.image && (
            <Box
              component="img"
              src={article.image}
              alt="article-img"
              sx={{ width: "50%", borderRadius: "8px", my: 3 }}
            />
          )}
          <Typography
            variant="body1"
            sx={{ lineHeight: "1.8", textAlign: "justify" }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ManageDetailBlog;
