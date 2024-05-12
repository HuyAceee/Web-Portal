import { LoadingComponent, LoadingContext } from "contexts/LoadingContext";
import type { SemesterFormModel } from "models/view/semester";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SemesterView } from "sections/semester/view";
import { SemesterService } from "services/semester";

// ----------------------------------------------------------------------

export default function SemesterPage() {
  const { t } = useTranslation();
  const { openLoading, closeLoading, loading } = useContext(LoadingContext);
  const [semesters, setSemesters] = useState<SemesterFormModel[]>([]);

  const getSemester = async () => {
    try {
      openLoading();
      const { data } = await SemesterService.listForUser();
      setSemesters(data);
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    getSemester();
  }, []);

  if (loading) {
    return <LoadingComponent open />
  }

  return (
    <>
      <Helmet>
        <title> {t("title.semester")} </title>
      </Helmet>

      <SemesterView semesters={semesters} />
    </>
  );
}
