"use client";

import { ROLE } from "constant/key";
import { Fragment } from "react";
import { isAdmin } from "utils/common";
import { handleLocalStorage } from "utils/localStorage";
import ContactAdminForm from "../ContactAdminForm";
import ContactAdminHistoryQuestions from "../ContactAdminHistoryQuestions";

export default function ContactAdminView(): JSX.Element {
  const { getLocalStorage } = handleLocalStorage()
  return (
    <Fragment>
      {!isAdmin(getLocalStorage(ROLE)) && <ContactAdminForm />}
      <ContactAdminHistoryQuestions />
    </Fragment>
  );
}
