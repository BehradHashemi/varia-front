import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

const SiteSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    siteTitle: "سایت من",
    maintenanceMode: false,
    allowRegistration: true,
    themeColor: "#374BFF",
    adminEmail: "",
    adminPassword: "",
  });

  useEffect(() => {
    fetch("/adminConfig.json")
      .then((response) => response.json())
      .then((data) => setSettings(data))
      .catch((error) => console.error("Error loading site settings:", error));
  }, []);

  const handleSave = async () => {
    const updatedSettings = { ...settings };
    await fetch("https://fronck.storage.c2.liara.space/adminConfig.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSettings),
    });
    alert("تنظیمات ذخیره شد!");
  };
  
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userType === "admin") {
      setUser(storedUser);
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mt={2}>
          تنظیمات سایت
        </Typography>
        <TextField
          fullWidth
          label="عنوان سایت"
          variant="outlined"
          margin="normal"
          value={settings.siteTitle}
          onChange={(e) =>
            setSettings({ ...settings, siteTitle: e.target.value })
          }
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.maintenanceMode}
              onChange={(e) =>
                setSettings({ ...settings, maintenanceMode: e.target.checked })
              }
            />
          }
          label="حالت تعمیر و نگهداری"
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.allowRegistration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  allowRegistration: e.target.checked,
                })
              }
            />
          }
          label="فعال کردن ثبت‌نام کاربران"
        />
        <Typography variant="h6" fontWeight="bold" mt={3}>
          اطلاعات ورود ادمین
        </Typography>
        <TextField
          fullWidth
          label="ایمیل ادمین"
          variant="outlined"
          margin="normal"
          value={settings.adminEmail}
          onChange={(e) =>
            setSettings({ ...settings, adminEmail: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="رمز عبور ادمین"
          type="password"
          variant="outlined"
          margin="normal"
          value={settings.adminPassword}
          onChange={(e) =>
            setSettings({ ...settings, adminPassword: e.target.value })
          }
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 3 }}
        >
          ذخیره تغییرات
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<HiOutlineLogout />}
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          خروج از حساب
        </Button>
      </Paper>
    </Box>
  );
};

export default SiteSettings;
