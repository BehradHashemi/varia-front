import React, { useEffect } from "react";
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

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
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
    onSubmit: async ({ name, email, password, confirmPassword, userType }) => {
      try {
        const { data, error } = await supabase
          .from("Fronck-Users")
          .insert([{ name, email, password, confirmPassword, userType }]);

        localStorage.setItem(
          "user",
          JSON.stringify({ name, email, password, userType })
        );
        if (error) throw error;
        toast.success("ثبت‌نام موفقیت‌آمیز بود!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        toast.error(error.message);
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
            />
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
            />
            <FormControl fullWidth>
              <InputLabel>نوع کاربر</InputLabel>
              <Select
                {...formik.getFieldProps("userType")}
                error={
                  formik.touched.userType && Boolean(formik.errors.userType)
                }
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
              sx={{
                backgroundColor: "#ff8b00",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(255, 139, 0, 0.5)",
              }}
            >
              ثبت نام
            </Button>
            <Link to="/login">حساب کاربری دارید؟ ورود</Link>
          </Box>
        </CacheProvider>
      </Paper>
    </Box>
  );
};

export default Register;
