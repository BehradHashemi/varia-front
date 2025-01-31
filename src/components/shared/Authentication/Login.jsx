import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [siteSettings, setSiteSettings] = useState({ adminEmail: "admin@example.com", adminPassword: "admin123" });

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem("siteSettings"));
    if (storedSettings) {
      setSiteSettings(storedSettings);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("ایمیل معتبر نیست")
        .required("وارد کردن ایمیل الزامی است"),
      password: Yup.string()
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
        .required("وارد کردن رمز عبور الزامی است"),
    }),
    onSubmit: (values) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === values.email) {
        toast.success(`${storedUser.name} عزیز خوش آمدید!`, {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/dashboard"), 2000);
      } else if (values.email === siteSettings.adminEmail && values.password === siteSettings.adminPassword) {
        localStorage.setItem("user", JSON.stringify({ name: "مدیر", email: values.email, userType: "admin" }));
        toast.success("ورود ادمین موفقیت‌آمیز بود!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/admin-panel"), 2000);
      } else {
        toast.error("ایمیل یا رمز عبور اشتباه است!", {
          position: "top-center",
          autoClose: 2500,
        });
      }
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", direction: "rtl", padding: 2 }}>
      <ToastContainer rtl />
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" mb={3} fontWeight="bold" color="#333">
          ورود به حساب
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="ایمیل"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="رمز عبور"
            type="password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(25, 118, 210, 0.5)",
              "&:hover": {
                backgroundColor: "#1565c0",
                boxShadow: "0 6px 15px rgba(21, 101, 192, 0.6)",
              },
            }}
          >
            ورود
          </Button>
          <Link to="/register">حساب کاربری ندارید؟ ثبت نام کنید</Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
