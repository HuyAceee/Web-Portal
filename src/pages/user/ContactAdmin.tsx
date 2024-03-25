import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ContactAdminView } from "sections/contactAdmin/view";

// ----------------------------------------------------------------------

export default function ContactAdminPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t("title.contactAdmin")} </title>
      </Helmet>

      <ContactAdminView />
    </>
  );
}
