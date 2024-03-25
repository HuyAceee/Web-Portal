import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";

import { useRouter } from "routes/hooks";

import { bgGradient } from "theme/css";

import { AccountCircle } from "@mui/icons-material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { FormHelperText } from "@mui/material";
import Iconify from "components/Iconify";
import { ACCESS_TOKEN } from "constant/key";
import { DASHBOARD_PAGE, RESET_PASSWORD } from "constant/router";
import { fieldEmail, fieldRequired } from "constant/validation";
import { LoadingContext } from "contexts/LoadingContext";
import { useFormik } from "formik";
import LanguagePopover from "layouts/dashboard/common/LanguagePopover";
import type { AuthLoginFormModel } from "models/view/auth";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { AuthService } from "services/auth";
import { handleLocalStorage } from "utils/localStorage";
import * as Yup from "yup";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { setLocalStorage } = handleLocalStorage();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const { openLoading, closeLoading } = useContext(LoadingContext);

  const formik = useFormik<AuthLoginFormModel>({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t(fieldRequired)).email(t(fieldEmail)),
      password: Yup.string().required(t(fieldRequired)),
    }),
    onSubmit: async (value, { resetForm }) => {
      resetForm();
      try {
        openLoading();
        const { data: accessToken } = await AuthService.login(value);

        setLocalStorage(ACCESS_TOKEN, accessToken);
        enqueueSnackbar(t("notification.title.loginSuccess"), {
          variant: "success",
        });
        router.push(DASHBOARD_PAGE);
      } catch (error) {
        enqueueSnackbar(t("notification.title.loginFail"), {
          variant: "error",
        });
      } finally {
        closeLoading();
      }
    },
  });

  const { errors, handleChange, values, handleSubmit, touched } = formik;

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) router.push(DASHBOARD_PAGE);
  }, []);

  const renderForm = (
    <>
      <form autoComplete="off" aria-autocomplete="none">
        <Stack spacing={2}>
          <TextField
            name="email"
            label="Email address"
            value={values.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            error={!!errors.email && touched.email}
          />
          {!!errors.email && touched.email && (
            <FormHelperText error id="accountId-error">
              {errors.email}
            </FormHelperText>
          )}

          <TextField
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            error={!!errors.password && touched.password}
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!!errors.password && touched.password && (
            <FormHelperText error id="accountId-error">
              {errors.password}
            </FormHelperText>
          )}
        </Stack>
      </form>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 2 }}
      >
        <Link
          variant="subtitle2"
          underline="hover"
          sx={{ cursor: "pointer" }}
          href={RESET_PASSWORD}
        >
          {t("auth.forgotPassword")}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={() => handleSubmit()}
      >
        {t("auth.button.login")}
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.5),
          imgUrl:
            "https://i.pinimg.com/originals/a5/f3/10/a5f310f7225e11b9ee5be82ef278f668.jpg",
        }),
        height: 1,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
        }}
      >
        <LanguagePopover />
      </Box>

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" color="Highlight">
            {t("auth.loginTitle")}
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            ></Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
