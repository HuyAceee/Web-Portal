import { useContext, useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import { useRouter } from "routes/hooks";

import { bgGradient } from "theme/css";

import { FormHelperText } from "@mui/material";
import { DASHBOARD_PAGE, LOGIN_PAGE } from "constant/router";
import { fieldEmail, fieldRequired } from "constant/validation";
import { LoadingContext } from "contexts/LoadingContext";
import { useFormik } from "formik";
import LanguagePopover from "layouts/dashboard/common/LanguagePopover";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// ----------------------------------------------------------------------

interface ResetPasswordFormModel {
  email: string;
}

export default function ResetPasswordView() {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { openLoading, closeLoading } = useContext(LoadingContext);

  const formik = useFormik<ResetPasswordFormModel>({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t(fieldRequired)).email(t(fieldEmail)),
    }),
    onSubmit: async (value, { resetForm }) => {
      console.log(value);
      resetForm();
      try {
        openLoading();
        // await call api
        enqueueSnackbar(t("notification.content.changePasswordSuccess"), {
          variant: "success",
        });
        router.push(DASHBOARD_PAGE)
      } catch (error) {
        enqueueSnackbar(t("notification.content.changePasswordFail"), {
          variant: "success",
        });
      } finally {
        closeLoading();
      }
    },
  });

  const { errors, handleChange, values, handleSubmit, touched } = formik;

  const renderForm = (
    <>
      <Stack spacing={1}>
        <TextField
          name="email"
          label="Email address"
          value={values.email}
          onChange={handleChange}
          error={!!errors.email && touched.email}
        />
        {!!errors.email && touched.email && (
          <FormHelperText error id="accountId-error">
            {errors.email}
          </FormHelperText>
        )}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link
          variant="subtitle2"
          underline="hover"
          sx={{ cursor: "pointer" }}
          href={LOGIN_PAGE}
        >
          Login
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
        Send
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
      {/* <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      /> */}
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
            Reset password
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
            Please enter your email !
          </Typography>

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack> */}

          <Divider sx={{ my: 2 }}>
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
