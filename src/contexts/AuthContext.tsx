import { ACCESS_TOKEN } from "constant/key";
import { LOGIN_PAGE } from "constant/router";
import type { UserInformationModel } from "models/view/user";
import { useSnackbar } from "notistack";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "routes/hooks";
import { UserService } from "services/user";
import { handleLocalStorage } from "utils/localStorage";

interface AuthContextModel {
  userInfo: UserInformationModel;
}

export const AuthContext = createContext<AuthContextModel>({
  userInfo: {} as UserInformationModel
});

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const { t } = useTranslation();
  const { removeLocalStorage, getLocalStorage } = handleLocalStorage()
  const accessToken = getLocalStorage(ACCESS_TOKEN)
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [userInfo, setUserInfo] = useState({} as UserInformationModel)
  const handleGetUserInfor = async() => {
    try {
      const { data } = await UserService.getUserInfo()
      if (!data) return
      setUserInfo(data)
    } catch (error) {
      enqueueSnackbar(t("notification.title.loginFail"), {
        variant: "warning",
      });
      removeLocalStorage(ACCESS_TOKEN)
      router.push(LOGIN_PAGE);
    }
  }
  useEffect(() => {
    handleGetUserInfor()
  }, [accessToken])

  return (
    <AuthContext.Provider
      value={{
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
