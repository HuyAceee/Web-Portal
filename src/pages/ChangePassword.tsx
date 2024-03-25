import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ChangePasswordView from "sections/changePassword/ChangePasswordView";

// ----------------------------------------------------------------------

export default function ChangePasswordPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("title.changePassword")}</title>
      </Helmet>

      <ChangePasswordView />
    </>
  );
}
