import { Button, Container, Stack, Typography } from "@mui/material";
import Iconify from "components/Iconify";
import { NEW_SEMESTER } from "constant/router";
import { useTranslation } from "react-i18next";
import { RouterLink } from "routes/components";

// ----------------------------------------------------------------------

export default function SemesterView() {
  const { t } = useTranslation();
  return (
    <Container>
      <Stack
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">{t("semester.list.title")}</Typography>
        <RouterLink href={NEW_SEMESTER}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            {t("notification.button.newNotification")}
          </Button>
        </RouterLink>
      </Stack>
    </Container>
  );
}
