import { RoleEnum } from "models/common";
import { ReactNode, createContext } from "react";
import { handleLocalStorage } from "utils/localStorage";

interface AuthContextModel {
  role: RoleEnum;
}

export const AuthContext = createContext<AuthContextModel>({
  role: RoleEnum.USER,
});

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const { getLocalStorage } = handleLocalStorage();
  const role = getLocalStorage("ROLE") as RoleEnum;

  return (
    <AuthContext.Provider
      value={{
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
