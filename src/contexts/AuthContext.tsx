import { ACCESS_TOKEN, ROLE } from "constant/key";
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
  handleGetUserInfor: () => Promise<void>
}

export const AuthContext = createContext<AuthContextModel>({
  userInfo: {} as UserInformationModel,
  handleGetUserInfor: () => { return Promise.resolve() }
});

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const { t } = useTranslation();
  const { removeLocalStorage, getLocalStorage, setLocalStorage } = handleLocalStorage();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [userInfo, setUserInfo] = useState({} as UserInformationModel);

  const handleError = () => {
    enqueueSnackbar(t("notification.title.loginAgain"), {
      variant: "warning",
    });
    removeLocalStorage(ACCESS_TOKEN);
    router.push(LOGIN_PAGE);
  }
  const handleGetUserInfor = async () => {
    const accessToken = getLocalStorage(ACCESS_TOKEN);
    try {
      if (!accessToken) {
        handleError()
        return
      }
      const { data } = await UserService.getUserInfo();
      setUserInfo(data);
      setLocalStorage(ROLE, data.role)
    } catch (error) {
      enqueueSnackbar(t("notification.title.loginAgain"), {
        variant: "warning",
      });
      removeLocalStorage(ACCESS_TOKEN);
      router.push(LOGIN_PAGE);
    }
  };
  useEffect(() => {
    handleGetUserInfor();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        handleGetUserInfor
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
