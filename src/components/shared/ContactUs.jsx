import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const validationSchema = Yup.object({
  name: Yup.string().required("نام الزامی است"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  message: Yup.string().required("پیام الزامی است"),
  recaptcha: Yup.string().required("لطفا تأیید کنید که ربات نیستید"),
});

const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      recaptcha: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data Submitted:", values);
      toast.success("پیام شما با موفقیت ارسال شد!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      formik.resetForm();
    },
  });

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#374BFF",
          fontSize: { xs: "1.8rem", sm: "2.5rem" },
          mb: 4,
        }}
      >
        تماس با ما
      </Typography>
      <ToastContainer />
      <Paper
        elevation={3}
        sx={{
          p: 4,
          direction: "rtl",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
      >
        <Typography
          variant="body1"
          sx={{ mb: 4, textAlign: "center", color: "text.secondary" }}
        >
          برای ارتباط با ما، فرم زیر را پر کنید.
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <CacheProvider value={rtlCache}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="نام شما"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                  sx={{
                    textAlign: "right",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FF8B00",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374BFF",
                        borderWidth: "2px",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ایمیل شما"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  variant="outlined"
                  sx={{
                    textAlign: "right",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FF8B00",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374BFF",
                        borderWidth: "2px",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="پیام شما"
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.message && Boolean(formik.errors.message)
                  }
                  helperText={formik.touched.message && formik.errors.message}
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{
                    textAlign: "right",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FF8B00",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374BFF",
                        borderWidth: "2px",
                      },
                    },
                  }}
                />
              </Grid>
            </CacheProvider>

            {/* کپچا */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ReCAPTCHA
                sitekey="SITE_KEY_YOU_RECEIVED_FROM_GOOGLE"
                onChange={(value) => formik.setFieldValue("recaptcha", value)}
              />
              {formik.touched.recaptcha && formik.errors.recaptcha && (
                <Typography color="error" variant="body2">
                  {formik.errors.recaptcha}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#374BFF",
                  "&:hover": { bgcolor: "#2A3AC7" },
                  py: 1.5,
                  fontSize: "1rem",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
              >
                ارسال پیام
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactUs;
