import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import EducationScienceCard from "./EducationScienceCard";
import type { CardModel } from "models/common";

const cards: CardModel[] = [
  {
    image:
      "https://www.mirea.ru/upload/resize_cache/iblock/c67/377_200_2/IMG_9435.png",
    title: "Институт информационных технологий",
    description: "",
  },
  {
    image:
      "https://www.mirea.ru/upload/resize_cache/iblock/485/377_200_2/IMG_8512.png",
    title: "Институт искусственного интеллект",
    description: "",
  },
  {
    image:
      "	https://www.mirea.ru/upload/resize_cache/iblock/876/377_200_2/IMG_5154.png",
    title: "Институт радиоэлектроники и информатики",
    description: "",
  },
  {
    image:
      "	https://www.mirea.ru/upload/resize_cache/iblock/0d4/377_200_2/IMG_3288.png",
    title: "Институт тонких химических технологий имени М.В. Ломоносова",
    description: "",
  },
  {
    image:
      "	https://www.mirea.ru/upload/resize_cache/iblock/cca/377_200_2/IMG_3971.png",
    title: "Институт кибербезопасности и цифровых технологий",
    description: "",
  },
  {
    image:
      "https://www.mirea.ru/upload/resize_cache/iblock/194/377_200_2/IMG_5004.png",
    title:
      "Институт перспективных технологий и индустриального программирования",
    description: "",
  },
  {
    image:
      "	https://www.mirea.ru/upload/resize_cache/iblock/e15/377_200_2/IMG_2605.png",
    title: "Институт технологий управления",
    description: "",
  },
  {
    image:
      "https://www.mirea.ru/upload/resize_cache/iblock/cfc/377_200_2/DSC06644.png",
    title: "Институт международного образования",
    description: "",
  },
];

const EducationScience = () => {
  return (
    <Box>
      <Typography sx={{ fontSize: 40, width: '100%' }} mb={5} alignContent="center" textAlign="center">Учебно-научные подразделения</Typography>
      <Grid container spacing={3} sx={{ width: "100%" }}>
        {cards.map((card, index) => (
          <Grid xs={12} sm={6} md={3} key={index}>
            <EducationScienceCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EducationScience;
