import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { useTranslation } from "react-i18next";

export default function ChangePasswordView() {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Typography variant="h4">{t("profile.info.title")}</Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid lg={6} md={6} xs={12}>
          <ChangePasswordForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
