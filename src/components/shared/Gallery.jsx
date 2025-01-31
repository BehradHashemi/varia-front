import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const categories = ["همه", "طراحی وب", "گرافیک", "عکاسی"];

const portfolioItems = [
  {
    id: 1,
    title: "طراحی سایت شرکتی",
    category: "طراحی وب",
    img: "/web1.png",
  },
  {
    id: 2,
    title: "لوگوی خلاقانه",
    category: "گرافیک",
    img: "/images/design1.jpg",
  },
  {
    id: 3,
    title: "عکاسی طبیعت",
    category: "عکاسی",
    img: "/images/nature1.jpg",
  },
  {
    id: 4,
    title: "فروشگاه آنلاین",
    category: "طراحی وب",
    img: "/web2.png",
  },
  {
    id: 5,
    title: "پوستر تبلیغاتی",
    category: "گرافیک",
    img: "/images/poster1.jpg",
  },
  {
    id: 6,
    title: "عکاسی پرتره",
    category: "عکاسی",
    img: "/images/portrait1.jpg",
  },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("همه");

  const filteredItems =
    selectedCategory === "همه"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#374BFF",
          fontSize: { xs: "1.8rem", sm: "2.5rem" },
          mb: 4,
        }}
      >
        نمونه کار ها
      </Typography>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "outlined"}
            sx={{
              m: 1,
              backgroundColor:
                selectedCategory === category ? "#007bff" : "white",
              color: selectedCategory === category ? "white" : "#007bff",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#0056b3", color: "white" },
            }}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </Box>
      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                boxShadow: 5,
                borderRadius: "16px",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.img}
                alt={item.title}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#333",
                  }}
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Gallery;
