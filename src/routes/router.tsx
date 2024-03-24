import { LOGIN_PAGE, NOT_FOUND_PAGE, RESET_PASSWORD } from "constant/router";
import { routerAdmin, routerUser } from "constant/routerConfig";
import { AuthContext } from "contexts/AuthContext";
import DashboardLayout from "layouts/dashboard";
import { RoleEnum } from "models/common";
import { Suspense, lazy, useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

export const LoginPage = lazy(() => import("pages/Login"));
export const Page404 = lazy(() => import("pages/PageNotFound"));
export const ResetPasswordPage = lazy(() => import("pages/ResetPassword"));

// ----------------------------------------------------------------------

export default function Router() {
  const { userInfo } = useContext(AuthContext)
  console.log(userInfo)
  const router = userInfo.role !== RoleEnum.USER ? routerUser : routerAdmin
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
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
