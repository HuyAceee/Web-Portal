import { ACCESS_TOKEN, ROLE } from "constant/key";
import { LOGIN_PAGE } from "constant/router";
import { ROUTER_NO_AUTH } from "constant/routerConfig";
import type { UserInformationModel } from "models/view/user";
import { useSnackbar } from "notistack";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "routes/hooks";
import { UserService } from "services/user";
import { handleLocalStorage } from "utils/localStorage";

interface AuthContextModel {
  userInfo: UserInformationModel;
  handleGetUserInfor: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextModel>({
  userInfo: {} as UserInformationModel,
  handleGetUserInfor: () => {
    return Promise.resolve();
  },
});

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const { t } = useTranslation();
  const { removeLocalStorage, getLocalStorage, setLocalStorage } =
    handleLocalStorage();
  const accessToken = getLocalStorage(ACCESS_TOKEN);
  const router = useRouter();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const [userInfo, setUserInfo] = useState({} as UserInformationModel);

  const handleError = () => {
    enqueueSnackbar(t("notification.title.loginAgain"), {
      variant: "warning",
    });
    removeLocalStorage(ACCESS_TOKEN);
    router.push(LOGIN_PAGE);
  };
  const handleGetUserInfor = async () => {
    try {
      if (!accessToken) {
        if (ROUTER_NO_AUTH.includes(pathname)) return;
        handleError();
        return;
      }
      const { data } = await UserService.getUserInfo();
      setUserInfo(data);
      setLocalStorage(ROLE, data.role);
    } catch (error) {
      handleError()
    }
  };
  useEffect(() => {
    handleGetUserInfor();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        handleGetUserInfor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
