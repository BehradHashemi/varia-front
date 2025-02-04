import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import { Delete, Add, Edit } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ojzkqlpghuyjazsitnic.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qemtxbHBnaHV5amF6c2l0bmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjcwOTAsImV4cCI6MjA1MzkwMzA5MH0.4ullxbHIL1BtAlbiVTUx7D3RWAFdLrMExKVQv2yNiqA"
);

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {
  MdAdminPanelSettings,
  MdDashboard,
  MdOutlineArticle,
} from "react-icons/md";
import e2p from "../../../../utils/persianNumber";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ManageUsers = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [searchEmail, setSearchEmail] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userType === "admin") {
      setUser(storedUser);
      fetchUsers();
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("Fronck-Users").select("*");
      if (error) throw error;
      setUsers(data);
    } catch (error) {
      toast.error("خطا در دریافت کاربران!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("Fronck-Users")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchUsers();
      toast.error("کاربر حذف شد.");
    } catch (error) {
      toast.error("خطا در حذف کاربر!");
    }
  };

  const handleAddUser = async () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.password ||
      !newUser.confirmPassword ||
      newUser.password !== newUser.confirmPassword
    ) {
      toast.warning("لطفاً تمامی فیلدها را پر کنید.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Fronck-Users")
        .insert([newUser])
        .select();
      if (error) throw error;
      fetchUsers();
      setOpen(false);
      setNewUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "user",
      });
      toast.success("کاربر جدید اضافه شد.");
    } catch (error) {
      toast.error("خطا در افزودن کاربر!");
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async () => {
    if (
      !editUser.name ||
      !editUser.email ||
      !editUser.password ||
      !editUser.confirmPassword
    ) {
      toast.warning("لطفاً تمامی فیلدها را پر کنید.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from("Fronck-Users")
        .update(editUser)
        .eq("id", editUser.id);
      if (error) throw error;
      fetchUsers();
      setEditOpen(false);
      toast.info("اطلاعات کاربر به‌روز شد.");
    } catch (error) {
      toast.error("خطا در به‌روزرسانی کاربر!");
    } finally {
      setLoading(false);
    }
  };
  const fetchUsersByEmail = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Fronck-Users")
        .select("*")
        .ilike("email", `%${searchEmail}%`);
      if (error) throw error;
      setUsers(data);
    } catch (error) {
      toast.error("خطا در دریافت کاربران!");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      userTypeFilter === "all" ||
      user.userType?.toLowerCase() === userTypeFilter.toLowerCase()
  );

  const menuItems = [
    {
      text: "داشبورد",
      icon: <MdDashboard />,
      path: "/dashboard",
    },
    {
      text: "مدیریت سایت",
      icon: <MdAdminPanelSettings />,
      path: "/admin-panel",
    },
    {
      text: "مدیریت مقالات",
      icon: <MdOutlineArticle />,
      path: "/manage-blogs",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 5,
        height: "100%",
        direction: "rtl",
      }}
    >
      <ToastContainer rtl />
      <Grid container spacing={2} sx={{ width: "100%", height: "100%" }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: "10px" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              مدریت کاربران
            </Typography>
            <List>
              {menuItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 1, textAlign: "center", borderRadius: "10px" }}>
            <CacheProvider value={rtlCache}>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  label="جستجو بر اساس ایمیل"
                  variant="outlined"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchUsersByEmail()}
                  fullWidth
                  sx={{
                    textAlign: "rgiht",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={fetchUsersByEmail}
                  sx={{
                    px: 3,
                    fontSize: "15px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                  }}
                >
                  جستجو
                </Button>
              </Box>
              <FormControl
                fullWidth
                margin="dense"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              >
                <Select
                  value={userTypeFilter}
                  onChange={(e) => setUserTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">همه کاربران</MenuItem>
                  <MenuItem value="admin">ادمین</MenuItem>
                  <MenuItem value="writer">نویسنده</MenuItem>
                  <MenuItem value="user">کاربر عادی</MenuItem>
                </Select>
              </FormControl>
            </CacheProvider>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add style={{ marginLeft: "5px" }} />}
              onClick={() => setOpen(true)}
              sx={{
                mt: 3,
                px: 3,
                fontSize: "14px",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              افزودن کاربر جدید
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    #
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    نام
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    ایمیل
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    نوع کاربر
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      هیچ کاربری ثبت نشده است.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell align="right">{e2p(user.id)}</TableCell>
                      <TableCell align="right">{user.name}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">
                        {user?.userType === "admin"
                          ? "ادمین"
                          : user?.userType === "writer"
                          ? "نویسنده"
                          : "کاربر عادی"}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="success"
                          onClick={() => {
                            setEditOpen(true);
                            setSelectedIndex(index);
                            setEditUser(user);
                          }}
                          sx={{ ml: 1, borderRadius: "10px" }}
                        >
                          <Edit />
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Delete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {/* دیالوگ افزودن کاربر */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>افزودن کاربر جدید</DialogTitle>
        <DialogContent>
          <CacheProvider value={rtlCache}>
            <TextField
              label="نام"
              fullWidth
              margin="dense"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="ایمیل"
              fullWidth
              margin="dense"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="رمز عبور"
              type="password"
              fullWidth
              margin="dense"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="تایید رمز عبور"
              type="password"
              fullWidth
              margin="dense"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <FormControl fullWidth margin="dense">
              <Select
                value={newUser.userType}
                onChange={(e) =>
                  setNewUser({ ...newUser, userType: e.target.value })
                }
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#FFF",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              >
                <MenuItem value="user">کاربر عادی</MenuItem>
                <MenuItem value="writer">نویسنده</MenuItem>
              </Select>
            </FormControl>
          </CacheProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            لغو
          </Button>
          <Button onClick={handleAddUser} color="primary">
            افزودن
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>ویرایش اطلاعات کاربر</DialogTitle>
        <DialogContent>
          <CacheProvider value={rtlCache}>
            <TextField
              label="نام"
              fullWidth
              margin="dense"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="ایمیل"
              fullWidth
              margin="dense"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="رمز عبور"
              fullWidth
              margin="dense"
              value={editUser.password}
              onChange={(e) =>
                setEditUser({ ...editUser, password: e.target.value })
              }
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="تایید رمز عبور"
              fullWidth
              margin="dense"
              value={editUser.confirmPassword}
              onChange={(e) =>
                setEditUser({ ...editUser, confirmPassword: e.target.value })
              }
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <FormControl fullWidth margin="dense">
              <Select
                value={editUser.userType}
                onChange={(e) =>
                  setEditUser({ ...editUser, userType: e.target.value })
                }
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#FFF",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              >
                <MenuItem value="admin">ادمین</MenuItem>
                <MenuItem value="user">کاربر عادی</MenuItem>
                <MenuItem value="writer">نویسنده</MenuItem>
              </Select>
            </FormControl>
          </CacheProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">
            لغو
          </Button>
          <Button onClick={handleEditUser} color="primary">
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
