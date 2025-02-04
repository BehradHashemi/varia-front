import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {
  MdAdminPanelSettings,
  MdCreate,
  MdDashboard,
  MdOutlineArticle,
  MdShoppingCart,
} from "react-icons/md";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const SiteSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    siteTitle: "سایت من",
    maintenanceMode: false,
    allowRegistration: true,
    adminEmail: "",
    adminPassword: "",
  });

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { text: "داشبورد", icon: <MdDashboard />, path: "/dashboard" },
    {
      text: "مدیریت سایت",
      icon: <MdAdminPanelSettings />,
      path: "/admin-panel",
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
      }}
    >
      <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center", borderRadius: "10px" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              تنظیمات سایت
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
        <Grid item xs={12} md={8}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              mb: 2,
              borderRadius: "10px",
              width: "100%",
              height: "100%",
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            <CacheProvider value={rtlCache}>
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
                      setSettings({
                        ...settings,
                        maintenanceMode: e.target.checked,
                      })
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
            </CacheProvider>
            <Typography variant="h6" fontWeight="bold" mt={3}>
              اطلاعات ورود ادمین
            </Typography>
            <CacheProvider value={rtlCache}>
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
            </CacheProvider>
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
              startIcon={<HiOutlineLogout style={{ marginLeft: "5px" }} />}
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              خروج از حساب
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SiteSettings;
