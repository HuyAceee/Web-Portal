import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { BlogView } from "sections/blog/view";

// ----------------------------------------------------------------------

export default function BlogPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t("title.blog")} </title>
      </Helmet>

      <BlogView />
    </>
  );
}
