import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import e2p from "../../utils/persianNumber";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching services:", error);
      } else {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <Box sx={{ px: 3, py: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          mx: "auto",
          color: "#374bff",
          textAlign: "center",
        }}
      >
        خدمات ما
      </Typography>

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))
          : services.map((service) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={service.cover_image}
                    alt={service.title}
                    sx={{ filter: "brightness(0.9)" }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      {service.description.slice(0, 20)}...
                    </Typography>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      {service.price === 0
                        ? "رایگان"
                        : `${e2p(service.price.toLocaleString())} تومان`}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/list/${service.route}`}
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        borderRadius: "10px",
                        bgcolor: "#374bff",
                        color: "#fff",
                      }}
                    >
                      مشاهده دوره
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default ServicesList;
