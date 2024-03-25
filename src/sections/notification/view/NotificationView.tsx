import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NotificationForm } from "../NotificationForm";
import { NotificationInfo } from "../NotificationInfo";

export default function NotificationView(): React.JSX.Element {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState();
  return (
    <Stack spacing={3}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Typography variant="h4">{t("blog.info.default")}</Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <NotificationInfo
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <NotificationForm selectedFile={selectedFile} />
        </Grid>
      </Grid>
    </Stack>
  );
}
