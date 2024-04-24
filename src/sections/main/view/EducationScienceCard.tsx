import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { EDUCATION_DETAIL } from "constant/router";
import type { CardModel } from "models/common";
import { useTranslation } from "react-i18next";
import { useRouter } from "routes/hooks";
import { convertObjectToQueryString } from "utils/common";

interface EducationScienceCardProps {
  card: CardModel;
}

export default function EducationScienceCard({
  card,
}: EducationScienceCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const handleRedirectEducationDetail = () => {
    router.push(
      EDUCATION_DETAIL +
        "?" +
        convertObjectToQueryString({
          id: card.id.toString(),
        })
    );
  };
  return (
    <Card sx={{ height: "100%", cursor: "pointer" }} onClick={handleRedirectEducationDetail}>
      <CardMedia
        component="img"
        height="200"
        sx={{
          aspectRatio: "4",
        }}
        src={card.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {t(card.title)}
        </Typography>
      </CardContent>
    </Card>
  );
}
