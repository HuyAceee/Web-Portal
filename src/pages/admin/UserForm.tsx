import { NEW_USER } from "constant/router";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { usePathname } from "routes/hooks";
import UserFormView from "sections/user/UserFormView";

// ----------------------------------------------------------------------

export default function UserFormPage() {
  const { t } = useTranslation();
  const pathname = usePathname();
  return (
    <>
      <Helmet>
        <title>
          {t(pathname === NEW_USER ? "title.addUser" : "title.updateUser")}
        </title>
      </Helmet>

      <UserFormView />
    </>
  );
}
