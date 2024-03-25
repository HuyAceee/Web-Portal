import { LOGIN_PAGE, NOT_FOUND_PAGE, RESET_PASSWORD } from "constant/router";
import { routerAdmin, routerUser } from "constant/routerConfig";
import { AuthContext } from "contexts/AuthContext";
import DashboardLayout from "layouts/dashboard";
import { Suspense, lazy, useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { AuthProvider } from "contexts/AuthContext";
import { isAdmin } from "utils/common";

// ----------------------------------------------------------------------

export const LoginPage = lazy(() => import("pages/Login"));
export const Page404 = lazy(() => import("pages/PageNotFound"));
export const ResetPasswordPage = lazy(() => import("pages/ResetPassword"));

// ----------------------------------------------------------------------

export default function Router() {
  const { userInfo } = useContext(AuthContext);
  const router = isAdmin(userInfo.role) ? routerAdmin : routerUser;
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <AuthProvider>
            <Suspense>
              <Outlet />
            </Suspense>
          </AuthProvider>
        </DashboardLayout>
      ),
      children: router?.map((router) => {
        return {
          ...router,
          element: <router.element />,
        };
      }),
    },
    {
      path: LOGIN_PAGE,
      element: <LoginPage />,
    },
    {
      path: RESET_PASSWORD,
      element: <ResetPasswordPage />,
    },
    {
      path: NOT_FOUND_PAGE,
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to={NOT_FOUND_PAGE} replace />,
    },
  ]);

  return routes;
}
