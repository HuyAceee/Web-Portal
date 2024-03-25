"use client";

import { Fragment, useContext } from "react";
import ContactAdminForm from "../ContactAdminForm";
import ContactAdminHistoryQuestions from "../ContactAdminHistoryQuestions";
import { AuthContext } from "contexts/AuthContext";
import { isAdmin } from "utils/common";

export default function ContactAdminView(): JSX.Element {
  const { userInfo } = useContext(AuthContext);
  return (
    <Fragment>
      {!isAdmin(userInfo.role) && <ContactAdminForm />}
      <ContactAdminHistoryQuestions />
    </Fragment>
  );
}
