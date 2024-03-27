import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { NEW_USER, PROFILE_PAGE } from "constant/router";
import { AuthContext } from "contexts/AuthContext";
import type { UserInformationModel } from "models/view/user";
import { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "routes/hooks";
import { AccountDetailsForm } from "sections/account/AccountDetailsForm";
import { AccountInfo } from "sections/account/AccountInfo";

export default function UserFormView(): React.JSX.Element {
  const { userInfo } = useContext(AuthContext);
  const { t } = useTranslation();
  const pathname = usePathname()
  const defaultData = useMemo(() => {
    if (pathname === PROFILE_PAGE) return userInfo
    if (pathname === NEW_USER) return {} as UserInformationModel
    return {} as UserInformationModel
  }, [pathname])
  const [selectedFile, setSelectedFile] = useState();
  return (
    <Stack spacing={3}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Typography variant="h4">{t("user.form.title")}</Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            defaultData={defaultData}
          />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm
            selectedFile={selectedFile}
            defaultData={defaultData}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
