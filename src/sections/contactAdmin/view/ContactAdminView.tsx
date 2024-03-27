"use client";

import { ROLE } from "constant/key";
import { Fragment, useEffect, useState } from "react";
import { isAdmin } from "utils/common";
import { handleLocalStorage } from "utils/localStorage";
import ContactAdminForm from "../ContactAdminForm";
import ContactAdminHistoryQuestions from "../ContactAdminHistoryQuestions";
import type { QuestionModel } from "models/view/question";
import { QuestionService } from "services/question";

export default function ContactAdminView(): JSX.Element {
  const { getLocalStorage } = handleLocalStorage();

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
    <Fragment>
      {!isAdmin(getLocalStorage(ROLE)) && <ContactAdminForm getQuestionList={getQuestionList} />}
      <ContactAdminHistoryQuestions questions={questions} getQuestionList={getQuestionList} />
    </Fragment>
  );
}
