"use client";

import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import ControlledAccordions from "components/ControlledAccordions";
import { useTranslation } from "react-i18next";

const data = [
  {
    title: "Controlled Accordion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    isComplete: true,
  },
  {
    title: "Controlled Accordion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    isComplete: false,
  },
];

export default function ContactAdminHistoryQuestions(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader
        subheader={t("profile.changePassword.subheader")}
        title={t("profile.changePassword.title")}
      />
      <Divider />
      <CardContent>
        <ControlledAccordions data={data} />
      </CardContent>
      <Divider />
    </Card>
  );
}
