"use client";

import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import ControlledAccordions from "./ControlledAccordions";
import type { QuestionModel } from "models/view/question";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuestionService } from "services/question";

interface ContactAdminHistoryQuestionsProps {
  questions: QuestionModel[]
  getQuestionList: () => Promise<void>
}

export default function ContactAdminHistoryQuestions({ questions, getQuestionList }: ContactAdminHistoryQuestionsProps): JSX.Element {
  const { t } = useTranslation();

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
