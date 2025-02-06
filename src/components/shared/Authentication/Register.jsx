import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) navigate("/dashboard");
    } catch (err) {
      console.error("خطا در دسترسی به localStorage", err);
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "user",
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("وارد کردن نام الزامی است"),
      email: Yup.string()
        .email("ایمیل معتبر نیست")
        .required("وارد کردن ایمیل الزامی است"),
      password: Yup.string()
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
        .required("وارد کردن رمز عبور الزامی است"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "رمز عبور و تکرار آن مطابقت ندارند")
        .required("تایید رمز عبور الزامی است"),
      userType: Yup.string().required("انتخاب نوع کاربر الزامی است"),
      acceptTerms: Yup.boolean().oneOf(
        [true],
        "پذیرش قوانین و مقررات الزامی است"
      ),
    }),
    onSubmit: async ({ name, email, password, userType }) => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        const user = data.user;
        if (!user) throw new Error("مشکلی در ثبت‌نام رخ داده است.");

        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            name,
            role: userType,
            created_at: new Date().toISOString(),
          },
        ]);

        if (profileError) throw profileError;

        localStorage.setItem(
          "user",
          JSON.stringify({ id: user.id, role: userType })
        );

        toast.success("ثبت‌نام موفقیت‌آمیز بود!", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
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
        padding: 1,
        mb: 2,
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
        }}
      >
        <Typography variant="h4" mb={3} fontWeight="bold">
          ثبت نام
        </Typography>
        <CacheProvider value={rtlCache}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="نام"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{
                textAlign: "right",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              label="ایمیل"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
              {...formik.getFieldProps("confirmPassword")}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
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
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <Select
                {...formik.getFieldProps("userType")}
                error={
                  formik.touched.userType && Boolean(formik.errors.userType)
                }
                sx={{
                  textAlign: "left",
                }}
              >
                <MenuItem value="user">کاربر</MenuItem>
                <MenuItem value="writer">نویسنده</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  {...formik.getFieldProps("acceptTerms")}
                  sx={{
                    my: 2,
                    width: 15,
                    height: 15,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    marginLeft: "5px",
                    border: "1px solid #ff8b00",
                    "&:hover": {
                      borderColor: "#ff8b00",
                    },
                    "&.Mui-checked": {
                      borderColor: "#ff8b00",
                      backgroundColor: "#ff8b00",
                      color: "#ffffff",
                      transform: "scale(1.1)",
                      borderRadius: "50%",
                    },
                    "& .MuiSvgIcon-root": {
                      display: "none",
                    },
                  }}
                />
              }
              label="قوانین و مقررات را می‌پذیرم"
              sx={{
                textAlign: "left",
                alignItems: "center",
                marginRight: 0,
                color: formik.errors.acceptTerms ? "red" : "inherit",
                fontWeight: formik.errors.acceptTerms ? "bold" : "inherit",
              }}
            />
            {formik.errors.acceptTerms && (
              <Typography
                variant="caption"
                color="error"
                sx={{ textAlign: "right", display: "block" }}
              >
                {formik.errors.acceptTerms}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: "#ff8b00",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(255, 139, 0, 0.5)",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "ثبت نام"
              )}
            </Button>
            <Box
              sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                component={Link}
                to="/login"
                sx={{ textDecoration: "none", color: "#ff8b00" }}
              >
                ورود به حساب
              </Button>
            </Box>
          </Box>
        </CacheProvider>
      </Paper>
    </Box>
  );
};

export default Register;
