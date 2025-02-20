import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { BiBriefcaseAlt } from "react-icons/bi";
import { FiAward } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import React from "react";

const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: "center", p: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Icon size={40} color={color} />
        </Box>
        <Typography variant="h4" color="primary" fontWeight={600}>
          {value}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

function ProjectList({ projects }) {
  return (
    <Grid item xs={12} md={12} sx={{ my: 2 }}>
      <Grid item md={12} sx={{ my: 1 }}>
        <StatCard
          icon={BiBriefcaseAlt}
          title="تعداد پروژه‌ها"
          value={projects.length}
          color="#007bff"
        />
      </Grid>
      <Grid item md={12} sx={{ my: 1 }}>
        <StatCard
          icon={FiAward}
          title="پروژه‌های فعال"
          value={projects.filter((p) => p.status === "فعال").length}
          color="#28a745"
        />
      </Grid>
      <Grid item md={12} sx={{ my: 1 }}>
        <StatCard
          icon={IoMdTime}
          title="پروژه‌های تکمیل شده"
          value={projects.filter((p) => p.status === "تکمیل شده").length}
          color="#dc3545"
        />
      </Grid>
    </Grid>
  );
}

export default ProjectList;
