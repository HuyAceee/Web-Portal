import { LazyExoticComponent, lazy } from "react";
import {
  CHANGE_PASSWORD_PAGE,
  CONTACT_ADMIN,
  DASHBOARD_PAGE,
  MAIN_PAGE,
  NEW_NOTIFICATION,
  NEW_SEMESTER,
  NEW_USER,
  NOTIFICATION_PAGE,
  PRODUCTS_PAGE,
  PROFILE_PAGE,
  RESET_PASSWORD,
  SEMESTER_PAGE,
  UPDATE_USER,
  USER_PAGE,
} from "./router";
import SvgColor from "components/SvgColor";

export const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

export const ROUTER_NO_AUTH = [MAIN_PAGE, RESET_PASSWORD];

const IndexPage = lazy(() => import("pages/App"));
const UserPage = lazy(() => import("pages/User"));
const NotificationPage = lazy(() => import("pages/Blog"));
const ProfilePage = lazy(() => import("pages/Profile"));
const ChangePasswordPage = lazy(() => import("pages/ChangePassword"));
const ContactAdminPage = lazy(() => import("pages/user/ContactAdmin"));
const NewNotificationPage = lazy(() => import("pages/admin/NotificationForm"));
const UserFormPage = lazy(() => import("pages/admin/UserForm"));
const SemesterPage = lazy(() => import("pages/admin/Semester"));
const NewSemesterPage = lazy(() => import("sections/semester/NewSemesterView"));

interface RouterItemModel {
  index?: boolean;
  element: LazyExoticComponent<() => JSX.Element>;
  title?: string;
  icon?: JSX.Element;
  isHiddenMenu?: boolean;
  path: string;
}

export const routerUser: RouterItemModel[] = [
  {
    path: DASHBOARD_PAGE,
    element: IndexPage,
    index: true,
    title: "dashboard",
    icon: icon("ic_analytics"),
  },
  {
    path: PROFILE_PAGE,
    element: ProfilePage,
    title: "profile",
    icon: icon("ic_profile"),
  },
  {
    path: CHANGE_PASSWORD_PAGE,
    element: ChangePasswordPage,
    isHiddenMenu: true,
  },
  {
    path: NOTIFICATION_PAGE,
    element: NotificationPage,
    title: "notification",
    icon: icon("ic_blog"),
  },
  {
    path: CONTACT_ADMIN,
    element: ContactAdminPage,
    title: "contact",
    icon: icon("ic_contact-admin"),
  },
];

export const routerAdmin: RouterItemModel[] = [
  {
    path: DASHBOARD_PAGE,
    element: IndexPage,
    index: true,
    title: "dashboard",
    icon: icon("ic_analytics"),
  },
  {
    path: PROFILE_PAGE,
    element: ProfilePage,
    title: "profile",
    icon: icon("ic_profile"),
  },
  { path: USER_PAGE, element: UserPage, title: "user", icon: icon("ic_user") },
  // {
  //   path: PRODUCTS_PAGE,
  //   element: ProductsPage,
  //   title: "product",
  //   icon: icon("ic_cart"),
  // },
  {
    path: CHANGE_PASSWORD_PAGE,
    element: ChangePasswordPage,
    isHiddenMenu: true,
  },
  {
    path: NOTIFICATION_PAGE,
    element: NotificationPage,
    title: "notification",
    icon: icon("ic_blog"),
  },
  {
    path: NEW_NOTIFICATION,
    element: NewNotificationPage,
    title: "notification",
    isHiddenMenu: true,
  },
  {
    path: CONTACT_ADMIN,
    element: ContactAdminPage,
    title: "contact",
    icon: icon("ic_contact-admin"),
  },
  {
    path: NEW_USER,
    element: UserFormPage,
    title: "contact",
    isHiddenMenu: true,
  },
  {
    path: UPDATE_USER,
    element: UserFormPage,
    title: "contact",
    isHiddenMenu: true,
  },
  {
    path: SEMESTER_PAGE,
    element: SemesterPage,
    title: "semester"
  },
  {
    path: NEW_SEMESTER,
    element: NewSemesterPage,
    title: "semester",
    isHiddenMenu: true
  },
];
