export const validate = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "ایمیل خود را وارد کنید";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "ایمیل صحیح وارد کنید";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "رمز عبور خود را وارد کنید";
  } else if (data.password.length < 6) {
    errors.password = "حداقل رمز عبور باید ۶ کاراکتر یا بیشتر باشد";
  } else {
    delete errors.password;
  }

  if (type === "signup") {
    if (!data.name.trim()) {
      errors.name = "نام خود را وارد کنید";
    } else {
      delete errors.name;
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "رمز خود را دوباره وارد کنید";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "رمز عبور مطابقت ندارد";
    } else {
      delete errors.confirmPassword;
    }

    if (data.isAccepted) {
      delete errors.isAccepted;
    } else {
      errors.isAccepted = "از موافقت خود با قوانین اطامینان داشته باشید";
    }
  }

  return errors;
};
