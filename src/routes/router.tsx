import { ROLE } from "constant/key";
import { LOGIN_PAGE, NOT_FOUND_PAGE, RESET_PASSWORD } from "constant/router";
import { routerAdmin, routerUser } from "constant/routerConfig";
import DashboardLayout from "layouts/dashboard";
import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { isAdmin } from "utils/common";
import { handleLocalStorage } from "utils/localStorage";

// ----------------------------------------------------------------------

export const LoginPage = lazy(() => import("pages/Login"));
export const Page404 = lazy(() => import("pages/PageNotFound"));
export const ResetPasswordPage = lazy(() => import("pages/ResetPassword"));

// ----------------------------------------------------------------------

export default function Router() {
  const { getLocalStorage } = handleLocalStorage();
  const router = isAdmin(getLocalStorage(ROLE)) ? routerAdmin : routerUser;
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
