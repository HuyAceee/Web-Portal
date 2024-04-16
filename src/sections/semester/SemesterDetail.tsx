import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LoadingComponent, LoadingContext } from "contexts/LoadingContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { SemesterService } from "services/semester";
import { SemesterForm } from "./SemesterForm";
import type { SemesterFormModel } from "models/view/semester";

interface SemesterQueriesModel {
  id?: string;
}

export default function NewSemesterView() {
  const { t } = useTranslation();
  const { closeLoading, openLoading, loading } = useContext(LoadingContext);
  const [detail, setDetail] = useState<SemesterFormModel>({} as SemesterFormModel)
  const [searchParams] = useSearchParams();
  const allParams: SemesterQueriesModel = Object.fromEntries(
    searchParams as unknown as Iterable<readonly any[]>
  );
  const handleGetSemesterDetail = async () => {
    try {
      openLoading();
      const { data } = await SemesterService.getDetail(allParams.id as string);
      setDetail(data)
    } catch (error) {
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    handleGetSemesterDetail();
  }, []);

  if (loading) return <LoadingComponent open />;

  return (
    <Stack spacing={3}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Typography variant="h4">{t("semester.list.title")}</Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid lg={12} md={12} xs={12}>
          <SemesterForm defaultData={detail} />
        </Grid>
      </Grid>
    </Stack>
  );
}
