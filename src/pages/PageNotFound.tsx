import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { NotFoundView } from 'sections/error';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t("title.notFound")} </title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
