import React from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
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
      const email = values.email;
      const password = values.password;
      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        toast.success("ورود موفقیت‌آمیز بود!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error("ایمیل یا رمز عبور اشتباه است.", {
          position: "top-center",
          autoClose: 3000,
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
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          mb={3}
          sx={{
            textAlign: "right",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          فرم ورود
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            textAlign: "right", // تنظیم متن به راست
          }}
        >
          <TextField
            id="email"
            name="email"
            label="ایمیل"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              paddingLeft: "5px",
              textAlign: "right",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
            }}
          />
          <TextField
            id="password"
            name="password"
            label="رمز عبور"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              paddingLeft: "5px",
              textAlign: "right",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: "#1976d2",
              padding: "10px 0",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(25, 118, 210, 0.5)",
              "&:hover": {
                backgroundColor: "#1565c0",
                boxShadow: "0 6px 15px rgba(21, 101, 192, 0.6)",
              },
            }}
          >
            ورود
          </Button>
          <Link to="/register">حساب کاربری ندارید؟</Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
