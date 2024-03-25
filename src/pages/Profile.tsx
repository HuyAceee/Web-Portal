import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ProfileView } from "sections/account/view";

export default function ProfilePage(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t("title.profile")} </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
