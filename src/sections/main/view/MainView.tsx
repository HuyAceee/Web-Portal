import Slider from "components/Slider";
import React from "react";
import { BANNERS } from "constant";
import { Box, Typography } from "@mui/material";
import EducationScience from "./EducationScience";
import Interesting from "./Interesting";
import { useTranslation } from "react-i18next";

const MainView = () => {
  const { t } = useTranslation()
return (
    <Box sx={{ maxWidth: "100vw" }}>
      <Slider list={BANNERS} />
      <Box
        px={5}
        mt={10}
        sx={{ display: "flex" }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            maxWidth: "1640px !important",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <EducationScience />
          <Typography sx={{ fontSize: 40, width: '100%' }} my={5} alignContent="center" textAlign="center">{t("main.interesting.title")}</Typography>
          <Interesting />
        </Box>
      </Box>
    </Box>
  );
};

export default MainView;
