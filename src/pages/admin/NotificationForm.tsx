import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import NotificationView from "sections/notification/view/NotificationView";

// ----------------------------------------------------------------------

export default function NotificationFormPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t("title.notification")}</title>
      </Helmet>

      <NotificationView />
    </>
  );
}
