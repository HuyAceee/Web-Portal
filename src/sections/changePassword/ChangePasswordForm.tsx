"use client";

import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Unstable_Grid2";
import { ACCESS_TOKEN } from "constant/key";
import { LOGIN_PAGE } from "constant/router";
import {
  fieldConfirmPasswordNotMatch,
  fieldRequired,
} from "constant/validation";
import { DialogContext } from "contexts/DialogContext";
import { LoadingContext } from "contexts/LoadingContext";
import { useFormik } from "formik";
import type { ChangePasswordFormModel } from "models/view/user";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "routes/hooks";
import { UserService } from "services/user";
import { handleLocalStorage } from "utils/localStorage";
import * as Yup from "yup";

export function ChangePasswordForm(): JSX.Element {
  const { t } = useTranslation();
  const { openDialog } = useContext(DialogContext);
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter()
  const { removeLocalStorage } = handleLocalStorage()

  const formik = useFormik<ChangePasswordFormModel>({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required(t(fieldRequired)),
      newPassword: Yup.string().required(t(fieldRequired)),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")], t(fieldConfirmPasswordNotMatch)),
    }),
    onSubmit: async (value) => {
      openDialog?.({
        content: t("notification.content.confirmChangePassword"),
        title: t("notification.title.confirmChangePassword"),
        onConfirm: async () => {
          try {
            openLoading();
            await UserService.changePassword(value);
            enqueueSnackbar(t("notification.content.changePasswordSuccess"), {
              variant: "success",
            });
            removeLocalStorage(ACCESS_TOKEN)
            router.push(LOGIN_PAGE)
          } catch (error) {
            enqueueSnackbar(t("notification.content.changePasswordFail"), {
              variant: "success",
            });
          } finally {
            closeLoading();
          }
        },
      });
    },
  });

  const { errors, handleChange, values, handleSubmit, touched } = formik;
  return (
    <Card>
      <CardHeader
        subheader={t("profile.changePassword.subheader")}
        title={t("profile.changePassword.title")}
      />
      <Divider />
      <CardContent>
        <Grid container padding={3} spacing={3} mt={1}>
          <FormControl fullWidth required>
            <InputLabel>{t("profile.form.oldPassword")}</InputLabel>
            <OutlinedInput
              label="Old Password"
              name="oldPassword"
              value={values.oldPassword}
              onChange={handleChange}
              error={!!errors.oldPassword && touched.oldPassword}
            />
            {!!errors.oldPassword && touched.oldPassword && (
              <FormHelperText error id="accountId-error">
                {errors.oldPassword}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid container padding={3} spacing={3} mt={3}>
          <FormControl fullWidth required>
            <InputLabel>{t("profile.form.newPassword")}</InputLabel>
            <OutlinedInput
              label="New Password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              error={!!errors.newPassword && touched.newPassword}
            />
            {!!errors.newPassword && touched.newPassword && (
              <FormHelperText error id="accountId-error">
                {errors.newPassword}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid container padding={3} spacing={3} mt={3} mb={1}>
          <FormControl fullWidth required>
            <InputLabel>{t("profile.form.confirmPassword")}</InputLabel>
            <OutlinedInput
              label="Old Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword && touched.confirmPassword}
            />
            {!!errors.confirmPassword && touched.confirmPassword && (
              <FormHelperText error id="accountId-error">
                {errors.confirmPassword}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          type="submit"
          onClick={() => handleSubmit()}
        >
          {t("profile.action.save")}
        </Button>
      </CardActions>
    </Card>
  );
}
