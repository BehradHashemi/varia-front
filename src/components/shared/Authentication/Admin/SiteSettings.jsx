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
    adminEmail: "admin@example.com",
    adminPassword: "admin123",
  });

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem("siteSettings"));
    if (storedSettings) {
      setSettings(storedSettings);
      document.documentElement.style.setProperty(
        "--theme-color",
        storedSettings.themeColor
      );
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("siteSettings", JSON.stringify(settings));
    document.documentElement.style.setProperty(
      "--theme-color",
      settings.themeColor
    );
    alert("تنظیمات ذخیره شد!");
  };

  const handleLogin = (email, password) => {
    const storedSettings = JSON.parse(localStorage.getItem("siteSettings"));
    if (
      storedSettings &&
      email === storedSettings.adminEmail &&
      password === storedSettings.adminPassword
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({ name: "مدیر", email, userType: "admin" })
      );
      navigate("/admin-panel");
    } else {
      alert("ایمیل یا رمز عبور نادرست است!");
    }
  };

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
        justifyContent: "center",
        direction: "rtl",
        padding: 2,
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
        <FormControl fullWidth margin="normal">
          <InputLabel>رنگ‌بندی سایت</InputLabel>
          <Select
            value={settings.themeColor}
            onChange={(e) =>
              setSettings({ ...settings, themeColor: e.target.value })
            }
          >
            <MenuItem value="#374BFF">آبی</MenuItem>
            <MenuItem value="#FF5733">قرمز</MenuItem>
            <MenuItem value="#4CAF50">سبز</MenuItem>
            <MenuItem value="#FFC107">زرد</MenuItem>
          </Select>
        </FormControl>
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
