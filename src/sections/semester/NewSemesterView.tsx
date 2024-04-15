import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTranslation } from "react-i18next";
import { SemesterForm } from "./SemesterForm";

export default function NewSemesterView() {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Typography variant="h4">{t("semester.list.title")}</Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid lg={12} md={12} xs={12}>
          <SemesterForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
