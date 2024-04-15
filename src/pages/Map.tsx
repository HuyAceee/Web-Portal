import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { MapView } from "sections/map/view";

// ----------------------------------------------------------------------

export default function MapPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t("title.main")} </title>
      </Helmet>

      <MapView />
    </>
  );
}
