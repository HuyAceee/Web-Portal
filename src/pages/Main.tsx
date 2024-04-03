import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { BlogView } from "sections/blog/view";
import { LoginView } from "sections/login";

// ----------------------------------------------------------------------

export default function MainPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t("title.main")} </title>
      </Helmet>

      <BlogView />
    </>
  );
}
