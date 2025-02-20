import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Snackbar,
  Card,
  CardContent,
} from "@mui/material";
import Sidebar from "./Sidebar";
import ChartProjects from "./Layout/ChartProjects";
import ChartBlogs from "./Layout/ChartBlogs";
import Partner from "./Layout/Partner";
import ProjectsTable from "./Layout/ProjectsTable";

import { createClient } from "@supabase/supabase-js";
import ProjectList from "./Layout/ProjectList";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
const supabase_list = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qemtxbHBnaHV5amF6c2l0bmljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODMyNzA5MCwiZXhwIjoyMDUzOTAzMDkwfQ._u8qKawemTP8Pju_TKY9wgk3RcQDI_eQFU_N41PgCgo"
);

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [projects, setProjects] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data: projectsData, error } = await supabase
        .from("projects")
        .select("*");

      if (error) {
        setSnackbarMessage("خطا در بارگذاری پروژه‌ها");
        setOpenSnackbar(true);
      } else {
        setProjects(projectsData);
      }

      setLoading(false);
      fetchOrders();
    };

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("خطا در دریافت سفارش‌ها:", error);
      } else {
        setOrders(data);
      }
    };

    const fetchUsersAndArticles = async () => {
      setLoading(true);
      const {
        data: { users },
        error: authError,
      } = await supabase_list.auth.admin.listUsers();
      if (authError) throw authError;

      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, name, role, banned, lastsignin_at");
      if (profileError) throw profileError;

      const mergedUsers = users.map((user) => ({
        ...user,
        ...profiles.find((p) => p.id === user.id),
      }));
      if (mergedUsers) {
        setAdmins(mergedUsers.filter((user) => user.role === "admin"));
        setAuthors(mergedUsers.filter((user) => user.role === "writer"));
      }

      const { data: articlesData } = await supabase
        .from("VARIA-Blogs")
        .select("status");
      if (articlesData) {
        setArticlesData(articlesData);
      }

      setLoading(false);
    };

    fetchProjects();
    fetchUsersAndArticles();
  }, []);

  const articleStatusCounts = articlesData.reduce(
    (acc, article) => {
      acc[article.status] = (acc[article.status] || 0) + 1;
      return acc;
    },
    { approved: 0, pending: 0, rejected: 0 }
  );

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{  width: "100%" }}>
      <Box component="main" sx={{ flexGrow: 1, py: 3, px: 1 }}>
        <Sidebar />
        {loading ? (
          <Box sx={{ minHeight: "100vh", textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <ProjectList projects={projects} />
            <ChartProjects />
            <ChartBlogs articleStatusCounts={articleStatusCounts} />
            <Partner authors={authors} filteredAdmins={filteredAdmins} />
            <Grid item xs={12} md={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  سفارش‌ها
                </Typography>
                <ProjectsTable
                  orders={orders}
                  admins={admins}
                  // assignAdmin={assignAdmin}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </Box>
  );
};

export default AdminPanel;
