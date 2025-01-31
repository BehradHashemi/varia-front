// import React, { useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Paper,
//   FormControlLabel,
//   Checkbox,
// } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("user")) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       acceptTerms: false,
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("وارد کردن نام الزامی است"),
//       email: Yup.string()
//         .email("ایمیل معتبر نیست")
//         .required("وارد کردن ایمیل الزامی است"),
//       password: Yup.string()
//         .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
//         .required("وارد کردن رمز عبور الزامی است"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "رمز عبور و تکرار آن مطابقت ندارند")
//         .required("تایید رمز عبور الزامی است"),
//       acceptTerms: Yup.boolean().oneOf(
//         [true],
//         "پذیرش قوانین و مقررات الزامی است"
//       ),
//     }),
//     onSubmit: ({ name, email }) => {
//       localStorage.setItem("user", JSON.stringify({ name, email }));
//       toast.success(`${name} خوش آمدید!`, {
//         position: "top-center",
//         autoClose: 2000,
//       });
//       setTimeout(() => navigate("/dashboard"), 2000);
//     },
//   });

//   return (
//     <Box
//
//     >
//       <ToastContainer rtl />
//       <Paper
//         elevation={10}
//         sx={{
//           p: 4,
//           borderRadius: "16px",
//           width: "100%",
//           maxWidth: "400px",
//           textAlign: "center",
//           backgroundColor: "#fff",
//           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Typography variant="h4" mb={3} fontWeight="bold" color="#333">
//           ثبت نام
//         </Typography>
//         <Box
//           component="form"
//           onSubmit={formik.handleSubmit}
//           sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//         >
//           <TextField
//             label="نام"
//             {...formik.getFieldProps("name")}
//             error={formik.touched.name && Boolean(formik.errors.name)}
//             helperText={formik.touched.name && formik.errors.name}
//           />
//           <TextField
//             label="ایمیل"
//             {...formik.getFieldProps("email")}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//           />
//           <TextField
//             label="رمز عبور"
//             type="password"
//             {...formik.getFieldProps("password")}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//           />
//           <TextField
//             label="تایید رمز عبور"
//             type="password"
//             {...formik.getFieldProps("confirmPassword")}
//             error={
//               formik.touched.confirmPassword &&
//               Boolean(formik.errors.confirmPassword)
//             }
//             helperText={
//               formik.touched.confirmPassword && formik.errors.confirmPassword
//             }
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 {...formik.getFieldProps("acceptTerms")}
//                 sx={{
//                   width: 15,
//                   height: 15,
//                   borderRadius: 2,
//                   transition: "all 0.3s ease",
//                   marginLeft: "5px",
//                   border: "1px solid #ff8b00",
//                   "&:hover": {
//                     borderColor: "#ff8b00",
//                   },
//                   "&.Mui-checked": {
//                     borderColor: "#ff8b00",
//                     backgroundColor: "#ff8b00",
//                     color: "#ffffff",
//                     transform: "scale(1.1)",
//                     borderRadius: "50%",
//                   },
//                   "& .MuiSvgIcon-root": {
//                     display: "none",
//                   },
//                 }}
//               />
//             }
//             label="قوانین و مقررات را می‌پذیرم"
//             sx={{
//               textAlign: "right",
//               alignItems: "center",
//               marginRight: 0,
//               color: formik.errors.acceptTerms ? "red" : "inherit",
//               fontWeight: formik.errors.acceptTerms ? "bold" : "inherit",
//             }}
//           />
//           {formik.errors.acceptTerms && (
//             <Typography
//               variant="caption"
//               color="error"
//               sx={{ textAlign: "right", display: "block" }}
//             >
//               {formik.errors.acceptTerms}
//             </Typography>
//           )}
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               backgroundColor: "#ff8b00",
//               borderRadius: "12px",
//               boxShadow: "0 6px 15px rgba(255, 139, 0, 0.5)",
//               "&:hover": {
//                 backgroundColor: "#e07b00",
//                 boxShadow: "0 8px 20px rgba(224, 123, 0, 0.6)",
//               },
//             }}
//           >
//             ثبت نام
//           </Button>
//           <Link
//             to="/login"
//             style={{
//               textDecoration: "none",
//               fontSize: "14px",
//               // color: "#ff8b00",
//               fontWeight: "bold",
//             }}
//           >
//             عضو سایت هستید؟ ورود
//           </Link>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Register;
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
    onSubmit: ({ name, email, userType }) => {
      localStorage.setItem("user", JSON.stringify({ name, email, userType }));
      toast.success(`${name} خوش آمدید!`, {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/dashboard"), 2000);
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
        }}
      >
        <Typography variant="h4" mb={3} fontWeight="bold">
          ثبت نام
        </Typography>
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
              error={formik.touched.userType && Boolean(formik.errors.userType)}
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
            sx={{
              backgroundColor: "#ff8b00",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(255, 139, 0, 0.5)",
              "&:hover": {
                backgroundColor: "#e07b00",
                boxShadow: "0 8px 20px rgba(224, 123, 0, 0.6)",
              },
            }}
          >
            ثبت نام
          </Button>
          <Link to="/login">حساب کاربری دارید؟ ورود</Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
