import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useTranslation } from "react-i18next";

function srcset(
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Interesting() {
  const { t } = useTranslation()
  return (
    <ImageList
      sx={{
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: "translateZ(0)",
      }}
      gap={1}
    >
      {itemData.map((item) => {

        return (
          <ImageListItem key={item.img} cols={1} rows={1}>
            <img
              {...srcset(item.img, 250, 200, 1, 1)}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={t(item.title)}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`star ${t(item.title)}`}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://www.mirea.ru/bitrix/templates/unlimtech/images/1.jpg",
    title: "main.interesting.title1",
  },
  {
    img: "https://www.mirea.ru/bitrix/templates/unlimtech/images/5.jpg",
    title: "main.interesting.title2",
  },
  {
    img: "https://www.mirea.ru/bitrix/templates/unlimtech/images/4.jpg",
    title: "main.interesting.title3",
  },
  {
    img: "https://www.mirea.ru/bitrix/templates/unlimtech/images/2.jpg",
    title: "main.interesting.title4",
  },
  {
    img: "https://www.mirea.ru/bitrix/templates/unlimtech/images/3.jpg",
    title: "main.interesting.title5",
  },
  {
    img: "https://www.mirea.ru/bitrix/templates/unlimtech/images/3.jpg",
    title: "main.interesting.title6",
  },
];
