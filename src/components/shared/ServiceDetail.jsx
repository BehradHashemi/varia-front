import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Grid,
  Skeleton,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Tooltip,
} from "@mui/material";
import e2p from "../../utils/persianNumber";
import { createClient } from "@supabase/supabase-js";
import { MdClose, MdLock, MdLockOpen, MdPlayCircle } from "react-icons/md";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ServiceDetail = () => {
  const { route } = useParams();
  const [service, setService] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState(null); // فقط یک فصل باز می‌شود
  const [openModal, setOpenModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const fetchCourse = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("route", route)
      .single();

    if (error) {
      console.error("Error fetching course:", error);
    } else {
      setService(data);
      const parsedSections =
        typeof data.sections === "string"
          ? JSON.parse(data.sections)
          : data.sections || [];
      setSections(parsedSections);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourse();
  }, [route]);

  const handleToggleSection = (sectionId) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const handleOpenModal = (url) => {
    if (!user) {
      alert("برای مشاهده ویدیو باید وارد حساب کاربری خود شوید.");
      return;
    }
    setVideoUrl(url);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setVideoUrl("");
  };

  if (loading || !service) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%" height={300} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 3, p: 2 }}>
      <Grid item xs={12}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 300,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src={service.cover_image}
            alt={service.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Typography
          variant="h4"
          color="#374bff"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
          }}
        >
          {service.title}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            mt: 1,
            lineHeight: 1.7,
            fontSize: { xs: "0.875rem", sm: "1rem", md: "1.1rem" },
          }}
        >
          {service.description}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          variant="h6"
          color="#ff8b00"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
          }}
        >
          {service.price === 0
            ? "رایگان"
            : `${e2p(service.price.toLocaleString())} تومان`}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, width: "80%", background: "#374bff", color: "#FFF" }}
          href="/list"
        >
          برگشت به لیست دوره‌ها
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="h5"
          color="#374bff"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
          }}
        >
          فصل ها و قسمت‌ها:
        </Typography>
        {sections.length > 0 ? (
          sections.map((section) => (
            <Accordion
              key={section.title}
              sx={{
                mb: 2,
                borderRadius: "8px",
              }}
              expanded={openSection === section.title}
              onChange={() => handleToggleSection(section.title)}
            >
              <AccordionSummary
                sx={{
                  py: 1,
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="h6"
                  color="#374bff"
                  sx={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                  }}
                >
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {section.episodes && section.episodes.length > 0 ? (
                  section.episodes.map((episode) => {
                    const isLocked = service.price !== 0 && !user;
                    return (
                      <Box
                        key={episode.title}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          py: 1,
                          px: 2,
                          borderRadius: "8px",
                          "&:hover": { backgroundColor: "action.hover" },
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body1">
                            {episode.title}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Chip
                            label={episode.duration || episode.video_url.length}
                            variant="outlined"
                            size="small"
                          />
                          <Button
                            variant="outlined"
                            onClick={() => handleOpenModal(episode.video_url)}
                            disabled={isLocked || !episode.video_url}
                            style={{ color: "#374bff" }}
                            startIcon={
                              <MdPlayCircle
                                size={18}
                                style={{ marginLeft: "10px" }}
                              />
                            }
                            sx={{ minWidth: 140 }}
                          >
                            مشاهده ویدیو
                          </Button>
                          {isLocked ? (
                            <Tooltip title="برای مشاهده ویدیو وارد شوید">
                              <MdLock color="#ff4444" size={20} />
                            </Tooltip>
                          ) : (
                            <Tooltip title="ویدیو قابل مشاهده است">
                              <MdLockOpen color="#00C851" size={20} />
                            </Tooltip>
                          )}
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Typography color="textSecondary">
                    هنوز قسمتی در این فصل وجود ندارد.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography color="textSecondary">
            هنوز فصلی برای این دوره اضافه نشده.
          </Typography>
        )}
      </Grid>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "80%",
            maxWidth: "100%",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogContent sx={{ position: "relative", padding: 0 }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              zIndex: 1000,
              borderRadius: "50%",
            }}
          >
            <MdClose color="white" />
          </IconButton>
          {videoUrl && (
            <Box sx={{ position: "relative", height: "60vh" }}>
              <iframe
                src={videoUrl}
                title="Video"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default ServiceDetail;
