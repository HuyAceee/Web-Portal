import { Helmet } from "react-helmet-async";
import ChangePasswordView from "sections/changePassword/ChangePasswordView";

// ----------------------------------------------------------------------

export default function ChangePasswordPage() {
  return (
    <>
      <Helmet>
        <title> Change password </title>
      </Helmet>

      <ChangePasswordView />
    </>
  );
}
