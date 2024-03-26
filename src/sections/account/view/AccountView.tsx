import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import { CHANGE_PASSWORD_PAGE } from "constant/router";
import { useTranslation } from "react-i18next";
import { RouterLink } from "routes/components";
import { AccountDetailsForm } from "sections/account/AccountDetailsForm";
import { AccountInfo } from "sections/account/AccountInfo";
import { useContext, useState } from "react";
import { AuthContext } from "contexts/AuthContext";

export default function ProfileView(): React.JSX.Element {
  const { userInfo } = useContext(AuthContext)
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState();
  return (
    <Stack spacing={3}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Typography variant="h4">{t("profile.info.title")}</Typography>
        <RouterLink href={CHANGE_PASSWORD_PAGE}>
          <Button variant="contained">
            {t("profile.action.changePassword")}
          </Button>
        </RouterLink>
      </Grid>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo selectedFile={selectedFile} setSelectedFile={setSelectedFile} defaultData={userInfo} />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm selectedFile={selectedFile} defaultData={userInfo} />
        </Grid>
      </Grid>
    </Stack>
  );
}
