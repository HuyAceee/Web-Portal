import { NEW_USER, UPDATE_USER } from "constant/router";
import { LoadingComponent, LoadingContext } from "contexts/LoadingContext";
import type { UserInformationModel } from "models/view/user";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { usePathname } from "routes/hooks";
import UserFormView from "sections/user/UserFormView";
import { UserService } from "services/user";

// ----------------------------------------------------------------------

interface UserFormQueriesModel {
  email?: string;
}

export default function UserFormPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { closeLoading, openLoading, loading } = useContext(LoadingContext)
  const [userDetail, setUserDetail] = useState<UserInformationModel>({} as UserInformationModel)
  const pathname = usePathname();
  const allParams: UserFormQueriesModel = Object.fromEntries(
    searchParams as unknown as Iterable<readonly any[]>
  );

  const getUserDetail = async() => {
    try {
      openLoading()
      const { data } = await UserService.getDetail(allParams.email as string)
      setUserDetail(data)
    } finally {
      closeLoading()
    }
  }

  useEffect(() => {
    if (pathname === UPDATE_USER) getUserDetail()
  }, [])

  if (loading) return <LoadingComponent open />

  return (
    <>
      <Helmet>
        <title>
          {t(pathname === NEW_USER ? "title.addUser" : "title.updateUser")}
        </title>
      </Helmet>

      <UserFormView userDetail={userDetail} />
    </>
  );
}
