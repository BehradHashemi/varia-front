import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      acceptTerms: Yup.boolean().oneOf(
        [true],
        "پذیرش قوانین و مقررات الزامی است"
      ),
    }),
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values));

      toast.success(`${values.name} خوش آمدید!`, {
        position: "top-center",
        autoClose: 3000,
      });
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
          فرم ثبت نام
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
            id="name"
            name="name"
            label="نام"
            variant="outlined"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{
              textAlign: "right",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff8b00",
              },
            }}
          />
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
              textAlign: "right",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff8b00",
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
              textAlign: "right",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff8b00",
              },
            }}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="تایید رمز عبور"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={{
              direction: "rtl",
              textAlign: "right",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff8b00",
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                color="primary"
                checked={formik.values.acceptTerms}
                onChange={formik.handleChange}
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: 2, // مربع اولیه
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
                    borderRadius: "50%", // تبدیل به دایره
                  },
                  "& .MuiSvgIcon-root": {
                    display: "none",
                  },
                }}
              />
            }
            label="قوانین و مقررات را می‌پذیرم"
            sx={{
              textAlign: "right",
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
            color="primary"
            fullWidth
            sx={{
              backgroundColor: "#ff8b00",
              padding: "10px 0",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: 3,
              boxShadow: "0 4px 10px #ff8b00",
              "&:hover": {
                backgroundColor: "#ff8b00",
                boxShadow: "0 6px 15px #ff8b00",
              },
            }}
          >
            ثبت نام
          </Button>
          <Link to="/login">عضو سایت هستید؟</Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
