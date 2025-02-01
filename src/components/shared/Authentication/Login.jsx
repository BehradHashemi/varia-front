import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();

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
    onSubmit: async (values) => {
      try {
        const { data, error } = await supabase
          .from("Fronck-Users")
          .select("*")
          .eq("email", values.email)
          .eq("password", values.password)
          .single();

        if (error) throw error;

        if (data) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: data.name,
              email: data.email,
              userType: data.userType,
            })
          );

          toast.success(`${data.name} عزیز خوش آمدید!`, {
            position: "top-center",
            autoClose: 2000,
          });

          setTimeout(() => navigate("/dashboard"), 2000);
        } else {
          toast.error("ایمیل یا رمز عبور اشتباه است!", {
            position: "top-center",
            autoClose: 2500,
          });
        }
      } catch (error) {
        toast.error("خطا در ورود به سیستم!", {
          position: "top-center",
          autoClose: 2500,
        });
      }
    },
  });

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
        <CacheProvider value={rtlCache}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
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
        </CacheProvider>
      </Paper>
    </Box>
  );
};

export default Login;