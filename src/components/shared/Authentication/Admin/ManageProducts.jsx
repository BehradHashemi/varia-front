import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import { MdDelete, MdEdit } from "react-icons/md";
import e2p from "../../../../utils/persianNumber";

// استایل اختصاصی برای کارت‌ها
const CourseCard = styled(motion(Card))(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(145deg, #ffffff, #f8f8f8)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 40px rgba(55,75,255,0.2)",
  },
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #374bff 0%, #7b8cff 100%)",
  },
}));

const ImageContainer = styled("div")({
  position: "relative",
  paddingTop: "56.25%", // 16:9 aspect ratio
  overflow: "hidden",
  "& img": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
});

const ManageProducts = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
    cover_image: "",
    sections: [],
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [newSection, setNewSection] = useState({
    title: "",
    duration: "",
    video_url: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) return navigate("/dashboard");

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, name, role, banned")
          .eq("id", data.user.id)
          .single();

        if (profileError || !profile || profile.role === "user") {
          return navigate("/dashboard");
        }

        setUser({
          id: data.user.id,
          author_id: profile.id,
          name: profile.name,
          role: profile.role,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/dashboard");
      }
    };
    fetchUser();
    fetchCourses();
  }, [navigate]);

  const fetchCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
      console.error("Error fetching courses:", error);
      toast.error("خطا در دریافت دوره‌ها!");
    } else {
      setCourses(data);
    }
  };

  const addCourse = async () => {
    const { error } = await supabase.from("courses").insert([newCourse]);
    if (error) {
      console.error("Error adding course:", error);
      toast.error("خطا در افزودن دوره!");
    } else {
      fetchCourses();
      setNewCourse({
        title: "",
        description: "",
        price: "",
        cover_image: "",
        route: "",
        sections: [],
      });
      toast.success("دوره با موفقیت اضافه شد!");
    }
  };

  const deleteCourse = async (id) => {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) {
      console.error("Error deleting course:", error);
      toast.error("خطا در حذف دوره!");
    } else {
      fetchCourses();
      toast.success("دوره با موفقیت حذف شد!");
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    const filePath = `course/${file.name}`;
    const { data, error } = await supabase.storage
      .from("VARIA")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      toast.error("خطا در آپلود تصویر!");
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("VARIA")
      .getPublicUrl(filePath);
    if (publicUrlData) {
      setNewCourse({ ...newCourse, cover_image: publicUrlData.publicUrl });
      toast.success("تصویر با موفقیت آپلود شد!");
    }
    setUploading(false);
  };

  return (
    <Container sx={{ py: 4, width: "100%" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#374bff",
          mx: "auto",
          textAlign: "center",
        }}
      >
        مدیریت دوره‌ها
      </Typography>

      <Grid container spacing={2}>
        <CacheProvider value={rtlCache}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="عنوان دوره"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="قیمت"
              type="number"
              value={newCourse.price}
              onChange={(e) =>
                setNewCourse({ ...newCourse, price: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="توضیحات دوره"
              multiline
              rows={4}
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="آدرس دوره (Route)"
              value={newCourse.route}
              onChange={(e) =>
                setNewCourse({ ...newCourse, route: e.target.value })
              }
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>
        </CacheProvider>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            component="label"
            sx={{ width: "100%", mb: 2 }}
          >
            {uploading ? <CircularProgress /> : "انتخاب تصویر کاور"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {newCourse.cover_image && (
            <img
              src={newCourse.cover_image}
              alt="Cover"
              style={{
                width: "100%",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={addCourse}
            sx={{ color: "#fff", background: "#374bff" }}
          >
            افزودن دوره
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} lg={4} key={course.id}>
            <CourseCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ImageContainer>
                <img
                  src={course.cover_image || "/placeholder-course.jpg"}
                  alt="cover"
                  loading="lazy"
                />
              </ImageContainer>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#2d3748",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {course.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    mb: 2,
                    minHeight: "60px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {course.description.slice(0, 20)}..
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "auto",
                  }}
                >
                  <Chip
                    label={
                      course.price === 0
                        ? "رایگان"
                        : `${e2p(course.price.toLocaleString())} تومان`
                    }
                    sx={{
                      fontWeight: 700,
                      borderRadius: "8px",
                      px: 2,
                      py: 1,
                      color: "#374bff",
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="حذف دوره" arrow>
                      <IconButton
                        color="error"
                        onClick={() => deleteCourse(course.id)}
                      >
                        <MdDelete color="error" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="ویرایش دوره" arrow>
                      <IconButton
                        component={Link}
                        to={`/manage-products/${course.route}`}
                        sx={{
                          color: "#374bff",
                        }}
                      >
                        <MdEdit color="#374bff" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </CourseCard>
          </Grid>
        ))}
      </Grid>

      {editingCourse && (
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="عنوان فصل"
              value={newSection.title}
              onChange={(e) =>
                setNewSection({ ...newSection, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="مدت زمان"
              value={newSection.duration}
              onChange={(e) =>
                setNewSection({ ...newSection, duration: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="آدرس ویدیو"
              value={newSection.video_url}
              onChange={(e) =>
                setNewSection({ ...newSection, video_url: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addSection(editingCourse.id)}
            >
              افزودن فصل
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};
export default ManageProducts;
