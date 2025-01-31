import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Button,
  Avatar,
  Chip,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete, Add, Edit } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ManageUsers = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userType === "admin") {
      setUser(storedUser);
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.error("کاربر حذف شد.");
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.warning("لطفاً تمامی فیلدها را پر کنید.");
      return;
    }
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setOpen(false);
    setNewUser({ name: "", email: "", password: "", role: "user" });
    toast.success("کاربر جدید اضافه شد.");
  };

  const handleEditUser = () => {
    if (!editUser.name || !editUser.email) {
      toast.warning("لطفاً تمامی فیلدها را پر کنید.");
      return;
    }
    const updatedUsers = [...users];
    updatedUsers[selectedIndex] = editUser;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditOpen(false);
    toast.info("اطلاعات کاربر به‌روز شد.");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "15px auto",
        p: 1,
      }}
    >
      <ToastContainer rtl />
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          color="#333"
          sx={{ borderBottom: "3px solid #1976d2", pb: 1 }}
        >
          مدیریت کاربران
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add style={{ marginLeft: "5px" }} />}
          onClick={() => setOpen(true)}
          sx={{
            mb: 3,
            px: 3,
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          افزودن کاربر جدید
        </Button>
        {users.length === 0 ? (
          <Typography color="textSecondary">
            هیچ کاربری ثبت نشده است.
          </Typography>
        ) : (
          <List sx={{ width: "100%" }}>
            {users.map((user, index) => (
              <>
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#f9f9f9",
                    mb: 2,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ width: 50, height: 50 }}>
                      {user.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#333"
                        textAlign="right"
                      >
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={user.role === "writer" ? "نویسنده" : "کاربر عادی"}
                    color={user.role === "writer" ? "secondary" : "default"}
                    variant="outlined"
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<Edit style={{ marginLeft: "5px" }}/>}
                      onClick={() => {
                        setEditOpen(true);
                        setSelectedIndex(index);
                        setEditUser(user);
                      }}
                    >
                      ویرایش
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Delete style={{ marginLeft: "5px" }}/>}
                      onClick={() => handleDelete(index)}
                    >
                      حذف
                    </Button>
                  </Box>
                </ListItem>
                {index !== users.length - 1 && <Divider sx={{ my: 2 }} />}
              </>
            ))}
          </List>
        )}
      </Paper>

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
            />
            <TextField
              label="ایمیل"
              fullWidth
              margin="dense"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
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
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>نقش کاربر</InputLabel>
              <Select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
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
            />
            <TextField
              label="ایمیل"
              fullWidth
              margin="dense"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>نقش کاربر</InputLabel>
              <Select
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
              >
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
