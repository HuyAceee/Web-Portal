import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { UserView } from "sections/user/view";

// ----------------------------------------------------------------------

export default function UserPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t("title.user")} </title>
      </Helmet>

      <UserView />
    </>
  );
}
