import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SemesterView } from "sections/semester/view";

// ----------------------------------------------------------------------

export default function SemesterPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t("title.semester")} </title>
      </Helmet>

      <SemesterView />
    </>
  );
}
