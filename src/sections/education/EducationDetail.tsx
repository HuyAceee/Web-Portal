import { Box, Container, Typography } from "@mui/material";
import { ca } from "date-fns/locale";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { cards } from "sections/main/view/EducationScience";

interface EducationDetailQueriesModel {
  id?: string;
}

const EducationDetail = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const allParams: EducationDetailQueriesModel = Object.fromEntries(
    searchParams as unknown as Iterable<readonly any[]>
  );

  const card = useMemo(() => {
    return cards.find((item) => item.id.toString() === allParams.id);
  }, [allParams]);
  return (
    <Container sx={{ pt: 2, pb: 5 }}>
      <Box sx={{ position: "relative", pb: 2 }}>
        <img src={card?.image} width="100%" />
        <Typography
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            fontWeight: "700",
            fontSize: 40,
            maxWidth: "50%",
          }}
        >
          {t(card?.title ?? "")}
        </Typography>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: t(card?.description ?? "") }}></div>
    </Container>
  );
};

export default EducationDetail;
