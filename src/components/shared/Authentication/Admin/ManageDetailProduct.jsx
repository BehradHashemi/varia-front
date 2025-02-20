import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Chip,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { MdOutlineExpandMore } from "react-icons/md";
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

import e2p from "../../../../utils/persianNumber";

const ManageDetailProduct = () => {
  const navigate = useNavigate();
  const { route } = useParams();
  const [course, setCourse] = useState(null);
  const [newPrice, setNewPrice] = useState(course?.price || 0);
  const [newSection, setNewSection] = useState({
    title: "",
    duration: "",
  });
  const [newEpisode, setNewEpisode] = useState({
    title: "",
    duration: "",
    video_url: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("route", route)
        .single();
      if (error) {
        console.error("Error fetching course:", error);
        navigate("/dashboard");
      } else {
        setCourse(data);
      }
    };
    fetchCourse();
  }, [route, navigate]);

  const addSection = async () => {
    if (course && course.sections) {
      const newSections = [...course.sections, { ...newSection, episodes: [] }];
      const { error } = await supabase
        .from("courses")
        .update({ sections: newSections })
        .eq("id", course.id);

      if (!error) {
        setCourse({ ...course, sections: newSections });
        setNewSection({ title: "", duration: "" });
      }
    }
  };

  const editSection = (index, key, value) => {
    const updatedSections = [...course.sections];
    updatedSections[index][key] = value;
    setCourse({ ...course, sections: updatedSections });
  };

  const deleteSection = async (index) => {
    const updatedSections = course.sections.filter((_, i) => i !== index);
    const { error } = await supabase
      .from("courses")
      .update({ sections: updatedSections })
      .eq("id", course.id);

    if (!error) {
      setCourse({ ...course, sections: updatedSections });
    }
  };

  const addEpisode = async (sectionIndex) => {
    const updatedSections = [...course.sections];
    updatedSections[sectionIndex].episodes.push(newEpisode);

    const { error } = await supabase
      .from("courses")
      .update({ sections: updatedSections })
      .eq("id", course.id);

    if (!error) {
      setCourse({ ...course, sections: updatedSections });
      setNewEpisode({ title: "", duration: "", video_url: "" });
    }
  };

  const editEpisode = (sectionIndex, episodeIndex, key, value) => {
    const updatedSections = [...course.sections];
    updatedSections[sectionIndex].episodes[episodeIndex][key] = value;
    setCourse({ ...course, sections: updatedSections });
  };

  const deleteEpisode = async (sectionIndex, episodeIndex) => {
    const updatedSections = [...course.sections];
    updatedSections[sectionIndex].episodes.splice(episodeIndex, 1);
    const { error } = await supabase
      .from("courses")
      .update({ sections: updatedSections })
      .eq("id", course.id);

    if (!error) {
      setCourse({ ...course, sections: updatedSections });
    }
  };
  const updatePrice = async () => {
    const { error } = await supabase
      .from("courses")
      .update({ price: newPrice })
      .eq("id", course.id);

    if (error) {
      console.error("Error updating price:", error);
    } else {
      setCourse({ ...course, price: newPrice });
    }
  };
  if (!course) return <Typography>در حال بارگذاری دوره...</Typography>;

  return (
    <Container sx={{ py: 4, textAlign: "right", backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#374bff"
        gutterBottom
        sx={{ mb: 4 }}
      >
        {course.title}
      </Typography>
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: 3,
          p: 2,
          mb: 3,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          {course.cover_image && (
            <Box
              component="img"
              src={course.cover_image}
              alt="Cover"
              sx={{
                width: "100%",
                height: 300,
                borderRadius: "8px",
                mb: 2,
                boxShadow: 3,
              }}
            />
          )}
          <Typography sx={{ mb: 2, fontSize: "1rem", color: "#555" }}>
            {course.description}
          </Typography>
          <Chip
            label={
              course.price === 0
                ? "رایگان"
                : `${e2p(course.price.toLocaleString())} تومان`
            }
            color="#374bff"
            sx={{ my: 2, fontSize: "1rem" }}
          />
          <CacheProvider value={rtlCache}>
            <TextField
              fullWidth
              label="قیمت جدید دوره"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              sx={{
                my: 2,
                borderRadius: "4px",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </CacheProvider>
          <Button
            variant="contained"
            onClick={updatePrice}
            sx={{
              mt: 2,
              backgroundColor: "#374bff",
              "&:hover": { backgroundColor: "#1d3cbb" },
            }}
          >
            تغییر قیمت
          </Button>
        </CardContent>
      </Card>

      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#374bff", fontWeight: 600 }}
      >
        فصل‌های دوره
      </Typography>
      {course.sections?.map((section, sectionIndex) => (
        <Accordion
          key={sectionIndex}
          sx={{
            mb: 2,
            borderRadius: "8px",
          }}
        >
          <AccordionSummary
            expandIcon={<MdOutlineExpandMore />}
            sx={{
              py: 1,
              borderRadius: "16px",
            }}
          >
            <Typography sx={{ fontWeight: 500, color: "#333" }}>
              {section.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#f9f9f9" }}>
            <CacheProvider value={rtlCache}>
              <TextField
                fullWidth
                label="عنوان فصل"
                value={section.title}
                onChange={(e) =>
                  editSection(sectionIndex, "title", e.target.value)
                }
                sx={{
                  mb: 2,
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  textAlign: "right",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </CacheProvider>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteSection(sectionIndex)}
              sx={{
                mt: 2,
                backgroundColor: "#ff4d4f",
                "&:hover": { backgroundColor: "#ff3333" },
              }}
            >
              حذف فصل
            </Button>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {section.episodes.map((episode, episodeIndex) => (
                <Grid item xs={12} md={6} key={episodeIndex}>
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                      my: 2,
                    }}
                  >
                    <CacheProvider value={rtlCache}>
                      <TextField
                        fullWidth
                        label="عنوان قسمت"
                        value={episode.title}
                        onChange={(e) =>
                          editEpisode(
                            sectionIndex,
                            episodeIndex,
                            "title",
                            e.target.value
                          )
                        }
                        sx={{
                          mb: 1,
                          borderRadius: "4px",
                          "& .MuiInputBase-root": {
                            borderRadius: "8px",
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="مدت زمان"
                        value={episode.duration}
                        onChange={(e) =>
                          editEpisode(
                            sectionIndex,
                            episodeIndex,
                            "duration",
                            e.target.value
                          )
                        }
                        sx={{
                          mb: 1,
                          borderRadius: "4px",
                          "& .MuiInputBase-root": {
                            borderRadius: "8px",
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="لینک ویدئو"
                        value={episode.video_url}
                        onChange={(e) =>
                          editEpisode(
                            sectionIndex,
                            episodeIndex,
                            "video_url",
                            e.target.value
                          )
                        }
                        sx={{
                          mb: 2,
                          borderRadius: "4px",
                          "& .MuiInputBase-root": {
                            borderRadius: "8px",
                          },
                        }}
                      />
                    </CacheProvider>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteEpisode(sectionIndex, episodeIndex)}
                      sx={{
                        mt: 1,
                        backgroundColor: "#ff4d4f",
                        "&:hover": { backgroundColor: "#ff3333" },
                      }}
                    >
                      حذف قسمت
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <TextField
              fullWidth
              label="عنوان قسمت جدید"
              value={newEpisode.title}
              onChange={(e) =>
                setNewEpisode({ ...newEpisode, title: e.target.value })
              }
              sx={{
                mb: 1,
                borderRadius: "4px",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              fullWidth
              label="مدت زمان قسمت جدید"
              value={newEpisode.duration}
              onChange={(e) =>
                setNewEpisode({ ...newEpisode, duration: e.target.value })
              }
              sx={{
                mb: 1,
                borderRadius: "4px",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              fullWidth
              label="لینک ویدئو قسمت جدید"
              value={newEpisode.video_url}
              onChange={(e) =>
                setNewEpisode({ ...newEpisode, video_url: e.target.value })
              }
              sx={{
                mb: 2,
                borderRadius: "4px",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => addEpisode(sectionIndex)}
              sx={{
                mt: 2,
                backgroundColor: "#374bff",
                "&:hover": { backgroundColor: "#1d3cbb" },
              }}
            >
              افزودن قسمت جدید
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ mt: 2 }}>
        <CacheProvider value={rtlCache}>
          <TextField
            fullWidth
            label="عنوان فصل جدید"
            value={newSection.title}
            onChange={(e) =>
              setNewSection({ ...newSection, title: e.target.value })
            }
            sx={{
              mb: 1,
              borderRadius: "4px",
              "& .MuiInputBase-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            fullWidth
            label="مدت زمان فصل جدید"
            value={newSection.duration}
            onChange={(e) =>
              setNewSection({ ...newSection, duration: e.target.value })
            }
            sx={{
              mb: 1,
              borderRadius: "4px",
              "& .MuiInputBase-root": {
                borderRadius: "8px",
              },
            }}
          />
        </CacheProvider>
        <Button
          variant="contained"
          onClick={addSection}
          sx={{
            mt: 2,
            backgroundColor: "#374bff",
            "&:hover": { backgroundColor: "#1d3cbb" },
          }}
        >
          افزودن فصل جدید
        </Button>
      </Box>
    </Container>
  );
};

export default ManageDetailProduct;
