"use client";

import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import ControlledAccordions from "./ControlledAccordions";
import type { QuestionModel } from "models/view/question";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuestionService } from "services/question";

export default function ContactAdminHistoryQuestions(): JSX.Element {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const getQuestionList = async () => {
    try {
      const { data } = await QuestionService.getList();
      if (!data) return;
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestionList();
  }, []);
  return (
    <Card>
      <CardHeader
        subheader={t("contactAdmin.questionHistory.subheader")}
        title={t("contactAdmin.questionHistory.title")}
      />
      <Divider />
      <CardContent>
        <ControlledAccordions data={questions} fetchData={getQuestionList} />
      </CardContent>
      <Divider />
    </Card>
  );
}
