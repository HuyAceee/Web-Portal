import { useContext } from "react";

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
import { LOGIN_PAGE } from "constant/router";
import { fieldEmail, fieldRequired } from "constant/validation";
import { DialogContext } from "contexts/DialogContext";
import { LoadingContext } from "contexts/LoadingContext";
import { useFormik } from "formik";
import LanguagePopover from "layouts/dashboard/common/LanguagePopover";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { AuthService } from "services/auth";
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
  const { openDialog } = useContext(DialogContext);

  const { openLoading, closeLoading } = useContext(LoadingContext);

  const formik = useFormik<ResetPasswordFormModel>({
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(t(fieldRequired)).email(t(fieldEmail)),
    }),
    onSubmit: async (value) => {
      try {
        openLoading();
        await AuthService.resetPassword(value);
        openDialog?.({
          title: "notification.title.success",
          content: "notification.content.resetPasswordSuccess",
          onConfirm() {
            router.push(LOGIN_PAGE);
          },
        });
      } catch (error) {
        enqueueSnackbar(t("notification.content.resetPasswordFail"), {
          variant: "error",
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
          {t("auth.button.login")}
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
        {t("action.send")}
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
            {t("auth.resetPassword")}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
            {t("auth.enterEmail")}
          </Typography>

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
