import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) navigate("/dashboard");
    };
    checkSession();
  }, [navigate]);
  const checkUserStatus = async (userId) => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("banned")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("خطا در بررسی وضعیت کاربر:", error);
      return;
    }

    if (profile?.banned) {
      await supabase.auth.signOut();
      toast.error("حساب شما غیرفعال شده است.");
    }
  };
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
        setLoading(true);
        checkUserStatus();
        const { data, error: authError } =
          await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          });

        if (authError) throw authError;

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, role, name")
          .eq("id", data.user.id)
          .single();

        if (profileError?.code === "PGRST116") {
          const { error: createProfileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: data.user.id,
                email: data.user.email,
                role: "user",
                name: "",
              },
            ]);

          if (createProfileError) throw createProfileError;
        }

        const userData = {
          id: data.user.id,
          email: data.user.email,
          role: profile?.role || "user",
          name: profile?.name || "",
        };

        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("ورود موفقیت آمیز! در حال انتقال...", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        const errorMessage =
          {
            "Invalid login credentials": "ایمیل یا رمز عبور اشتباه است",
            "Email not confirmed": "لطفا ابتدا ایمیل خود را تایید کنید",
          }[error.message] || "خطا در ورود به سیستم";

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handlePasswordReset = async () => {
    if (!formik.values.email) {
      toast.error("لطفا ایمیل خود را وارد کنید", { position: "top-center" });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formik.values.email
      );
      if (error) throw error;

      toast.success(
        `لینک بازنشانی رمز عبور به ${formik.values.email} ارسال شد`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
    } catch (error) {
      toast.error("خطا در ارسال لینک بازنشانی", { position: "top-center" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f0f2f5",
        p: 2,
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
          ورود به حساب
        </Typography>

        <CacheProvider value={rtlCache}>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                fullWidth
                label="آدرس ایمیل"
                name="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                disabled={loading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="رمز عبور"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
                helperText={formik.touched.password && formik.errors.password}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle-password"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  backgroundColor: "#374bff",
                  borderRadius: "12px",
                  boxShadow: "0 6px 15px rgba(55, 75, 255, 0.5)",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "ورود به حساب"
                )}
              </Button>

              <Box
                sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  component={Link}
                  to="/register"
                  color="primary"
                  sx={{ textDecoration: "none" }}
                >
                  ایجاد حساب جدید
                </Button>

                <Button
                  onClick={handlePasswordReset}
                  color="secondary"
                  sx={{ textDecoration: "none" }}
                >
                  بازیابی رمز عبور
                </Button>
              </Box>
            </Box>
          </form>
        </CacheProvider>
      </Paper>
    </Box>
  );
};

export default Login;
