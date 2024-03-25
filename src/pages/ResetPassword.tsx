import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import ResetPasswordView from 'sections/resetPassword/ResetPasswordView';

// ----------------------------------------------------------------------

export default function ResetPasswordwordPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("title.resetPassword")} </title>
      </Helmet>

      <ResetPasswordView />
    </>
  );
}
