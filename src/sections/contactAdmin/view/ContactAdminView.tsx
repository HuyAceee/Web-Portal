"use client";

import { Fragment } from "react";
import ContactAdminForm from "../ContactAdminForm";
import ContactAdminHistoryQuestions from "../ContactAdminHistoryQuestions";

export default function ContactAdminView(): JSX.Element {
  return (
    <Fragment>
      <ContactAdminForm />
      <ContactAdminHistoryQuestions  />
    </Fragment>
  );
}
