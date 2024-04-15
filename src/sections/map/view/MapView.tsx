import { Button, Card, Container, Stack, Typography } from "@mui/material";
import Iconify from "components/Iconify";
import { MAPS } from "constant";
import { NEW_SEMESTER } from "constant/router";
import type { HeaderLabelModel } from "models/common";
import { useTranslation } from "react-i18next";
import { RouterLink } from "routes/components";
import Slider from "components/Slider";

// ----------------------------------------------------------------------

export default function MapView() {
  const { t } = useTranslation();

  return (
    <Container>
      <Stack
        sx={{ pb: 3 }}
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">{t("title.map")}</Typography>
      </Stack>
      <Card>
        <Slider list={MAPS} unusedClass />
      </Card>
    </Container>
);
}
