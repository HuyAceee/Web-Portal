import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import type { CardModel } from "models/common";

interface EducationScienceCardProps {
  card: CardModel;
}

export default function EducationScienceCard({
  card,
}: EducationScienceCardProps) {
  return (
    <Card sx={{ height: "100%" }}>
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
          {card.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
