import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function SemesterView() {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <Typography variant="h4">{t("semester.list.title")}</Typography>
    </Stack>
  );
}
