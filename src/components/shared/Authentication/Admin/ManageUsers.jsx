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
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Delete,
  Add,
  Edit,
  VerifiedUser,
  Person,
  Engineering,
  ToggleOff,
  ToggleOn,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qemtxbHBnaHV5amF6c2l0bmljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODMyNzA5MCwiZXhwIjoyMDUzOTAzMDkwfQ._u8qKawemTP8Pju_TKY9wgk3RcQDI_eQFU_N41PgCgo"
);

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import e2p from "../../../../utils/persianNumber";
import moment from "moment-jalaali";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const ManageUsers = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const initialUserState = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "user",
  };
  const [newUser, setNewUser] = useState(initialUserState);
  const [selectedUser, setSelectedUser] = useState(initialUserState);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      console.log(profile);

      if (!user || profile?.role !== "admin") {
        navigate("/dashboard");
        return;
      }
      setCurrentUser(user);
      fetchUsers();
    };
    checkAdmin();
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const {
        data: { users },
        error: authError,
      } = await supabase.auth.admin.listUsers();
      if (authError) throw authError;

      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, name, role, banned, lastsignin_at");
      if (profileError) throw profileError;

      const mergedUsers = users.map((user) => ({
        ...user,
        ...profiles.find((p) => p.id === user.id),
      }));

      setUsers(mergedUsers);
    } catch (error) {
      toast.error(`خطا در دریافت کاربران: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId, isBanned) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ banned: isBanned })
        .eq("id", userId);

      if (error) throw error;

      toast.success(
        `وضعیت کاربر با موفقیت ${isBanned ? "غیرفعال" : "فعال"} شد!`
      );
      fetchUsers();
    } catch (error) {
      toast.error(`خطا در تغییر وضعیت: ${error.message}`);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.password || !newUser.name || !newUser.role) {
      toast.warning("لطفاً تمام فیلدهای ضروری را پر کنید!");
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      toast.warning("رمز عبور و تایید آن مطابقت ندارند!");
      return;
    }

    setLoading(true);
    try {
      const { data: authUser, error: authError } =
        await supabase.auth.admin.createUser({
          email: newUser.email,
          password: newUser.password,
          email_confirm: true,
          user_metadata: { name: newUser.name },
        });
      if (authError) throw authError;

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authUser.user.id,
          name: newUser.name,
          role: newUser.role,
          email: newUser.email,
        },
      ]);
      if (profileError) throw profileError;

      toast.success("کاربر با موفقیت ایجاد شد!");
      setOpenDialog(false);
      fetchUsers();
      setNewUser(initialUserState);
    } catch (error) {
      toast.error(`خطا در ایجاد کاربر: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser.email || !selectedUser.name || !selectedUser.role) {
      toast.warning("لطفاً تمام فیلدهای ضروری را پر کنید!");
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.admin.updateUserById(
        selectedUser.id,
        {
          email: selectedUser.email,
          user_metadata: { name: selectedUser.name },
        }
      );
      if (authError) throw authError;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name: selectedUser.name,
          role: selectedUser.role,
          email: selectedUser.email,
        })
        .eq("id", selectedUser.id);
      if (profileError) throw profileError;

      toast.success("اطلاعات کاربر با موفقیت به‌روز شد!");
      setEditDialog(false);
      fetchUsers();
    } catch (error) {
      toast.error(`❌ خطا در به‌روزرسانی: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("آیا از حذف این کاربر اطمینان دارید؟")) {
      try {
        const { error: authError } = await supabase.auth.admin.deleteUser(
          userId
        );
        if (authError) throw authError;

        const { error: profileError } = await supabase
          .from("profiles")
          .delete()
          .eq("id", userId);
        if (profileError) throw profileError;

        toast.success("کاربر با موفقیت حذف شد!");
        fetchUsers();
      } catch (error) {
        toast.error(`خطا در حذف کاربر: ${error.message}`);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesSearch =
      user.email.includes(searchTerm) || user.name?.includes(searchTerm);
    return matchesRole && matchesSearch;
  });

  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
      <ToastContainer rtl />

      <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<Add style={{ marginLeft: "5px" }} />}
          onClick={() => setOpenDialog(true)}
          sx={{
            minWidth: 200,
            textAlign: "right",
            borderRadius: "12px",
          }}
        >
          کاربر جدید
        </Button>
        <CacheProvider value={rtlCache}>
          <FormControl
            sx={{
              minWidth: 150,
              textAlign: "center",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          >
            <InputLabel>فیلتر نقش</InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              label="فیلتر نقش"
            >
              <MenuItem value="all">همه</MenuItem>
              <MenuItem value="admin">مدیر</MenuItem>
              <MenuItem value="writer">نویسنده</MenuItem>
              <MenuItem value="user">کاربر عادی</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="جستجو (ایمیل یا نام)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flexGrow: 1,
              textAlign: "right",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
        </CacheProvider>
      </Box>

      {/* جدول کاربران */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "background.paper" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                نام
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                ایمیل
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                نقش
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                وضعیت
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                آخرین بازدید
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  کاربری یافت نشد
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, index) => (
                <TableRow key={user.id} hover>
                  <TableCell sx={{ textAlign: "right" }}>
                    {e2p(index + 1)}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    {user.name || "-"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {user.role === "admin" ? (
                        <VerifiedUser color="primary" />
                      ) : user.role === "writer" ? (
                        <Engineering color="secondary" />
                      ) : (
                        <Person color="disabled" />
                      )}
                      {user.role === "admin"
                        ? "مدیر"
                        : user.role === "writer"
                        ? "نویسنده"
                        : "کاربر"}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Box
                      sx={{
                        bgcolor: user.banned ? "error.light" : "success.light",
                        color: "white",
                        px: 1,
                        borderRadius: 1,
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleToggleUserStatus(user.id, !user.banned)
                      }
                    >
                      {user.banned ? "غیرفعال" : "فعال"}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    {e2p(
                      moment(user?.lastsignin_at)
                        .locale("fa")
                        .format("jYYYY/jMM/jDD")
                    )}
                  </TableCell>

                  <TableCell sx={{ textAlign: "left" }}>
                    <Tooltip title="ویرایش">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedUser({
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role,
                          });
                          setEditDialog(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="حذف">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.id === currentUser?.id}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>ایجاد کاربر جدید</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 2,
            my: 2,
          }}
        >
          <CacheProvider value={rtlCache}>
            <TextField
              label="نام کامل"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
              sx={{
                mt: 2,
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="ایمیل"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
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
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="تکرار رمز عبور"
              type="password"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
              required
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <FormControl
              fullWidth
              sx={{
                textAlign: "center",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <InputLabel>نقش کاربر</InputLabel>
              <Select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                label="نقش کاربر"
              >
                <MenuItem value="user">کاربر عادی</MenuItem>
                <MenuItem value="writer">نویسنده</MenuItem>
                <MenuItem value="admin">مدیر سیستم</MenuItem>
              </Select>
            </FormControl>
          </CacheProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            لغو
          </Button>
          <Button
            onClick={handleCreateUser}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "ایجاد کاربر"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>ویرایش کاربر</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 2,
            my: 2,
          }}
        >
          <CacheProvider value={rtlCache}>
            <TextField
              label="نام کامل"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              required
              sx={{
                mt: 2,
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="ایمیل"
              type="email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              required
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <FormControl
              fullWidth
              sx={{
                textAlign: "center",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <InputLabel>نقش کاربر</InputLabel>
              <Select
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
                label="نقش کاربر"
              >
                <MenuItem value="user">کاربر عادی</MenuItem>
                <MenuItem value="writer">نویسنده</MenuItem>
                <MenuItem value="admin">مدیر سیستم</MenuItem>
              </Select>
            </FormControl>
          </CacheProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)} color="secondary">
            لغو
          </Button>
          <Button
            onClick={handleUpdateUser}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "ذخیره تغییرات"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
