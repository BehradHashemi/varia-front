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
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ojzkqlpghuyjazsitnic.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qemtxbHBnaHV5amF6c2l0bmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMjcwOTAsImV4cCI6MjA1MzkwMzA5MH0.4ullxbHIL1BtAlbiVTUx7D3RWAFdLrMExKVQv2yNiqA"
);

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
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
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
    try {
      const { data, error } = await supabase.from("Fronck-Users").select("*");
      if (error) throw error;
      setUsers(data);
    } catch (error) {
      toast.error("خطا در دریافت کاربران!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("Fronck-Users").delete().eq("id", id);
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
    }
  };

  const handleEditUser = async () => {
    if (!editUser.name || !editUser.email) {
      toast.warning("لطفاً تمامی فیلدها را پر کنید.");
      return;
    }
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
    }
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
                  key={user.id}
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
                    label={
                      user.userType === "admin"
                        ? "ادمین"
                        : user?.userType === "writer"
                        ? "نویسنده"
                        : "کاربر عادی"
                    }
                    color={user.userType === "writer" ? "secondary" : "default"}
                    variant="outlined"
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<Edit style={{ marginLeft: "5px" }} />}
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
                      startIcon={<Delete style={{ marginLeft: "5px" }} />}
                      onClick={() => handleDelete(user.id)}
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
            <TextField
              label="تایید رمز عبور"
              type="password"
              fullWidth
              margin="dense"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>نقش کاربر</InputLabel>
              <Select
                value={newUser.userType}
                onChange={(e) =>
                  setNewUser({ ...newUser, userType: e.target.value })
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
                value={editUser.userType}
                onChange={(e) =>
                  setEditUser({ ...editUser, userType: e.target.value })
                }
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
