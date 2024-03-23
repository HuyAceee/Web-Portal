import { Helmet } from 'react-helmet-async';

import ResetPasswordView from 'sections/resetPassword/ResetPasswordView';

// ----------------------------------------------------------------------

export default function ResetPasswordwordPage() {
  return (
    <>
      <Helmet>
        <title> Reset Password | Minimal UI </title>
      </Helmet>

      <ResetPasswordView />
    </>
  );
}
