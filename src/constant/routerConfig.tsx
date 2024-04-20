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
  MAP_PAGE,
  DETAIL_SEMESTER,
  POINT_PAGE,
  DETAIL_NOTIFICATION
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
const MapPage = lazy(() => import("sections/map/view/MapView"));
const SemesterDetailPage = lazy(() => import("sections/semester/SemesterDetail"));
const PointPage = lazy(() => import("pages/Point"));

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
    title: "title.dashboard",
    icon: icon("ic_analytics"),
  },
  {
    path: PROFILE_PAGE,
    element: ProfilePage,
    title: "title.profile",
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
    title: "title.notification",
    icon: icon("ic_blog"),
  },
  {
    path: DETAIL_NOTIFICATION,
    element: NewNotificationPage,
    title: "title.notification",
    isHiddenMenu: true,
  },
  {
    path: CONTACT_ADMIN,
    element: ContactAdminPage,
    title: "title.contactAdmin",
    icon: icon("ic_contact-admin"),
  },
  {
    path: SEMESTER_PAGE,
    element: SemesterPage,
    title: "title.semester",
    icon: icon("ic_semester"),
  },
  {
    path: MAP_PAGE,
    element: MapPage,
    title: "title.map",
    icon: icon("ic_map"),
  },
  {
    path: POINT_PAGE,
    element: PointPage,
    title: "title.point",
    icon: icon("ic_point"),
  },
  {
    path: DETAIL_SEMESTER,
    element: SemesterDetailPage,
    isHiddenMenu: true
  },
];

export const routerAdmin: RouterItemModel[] = [
  {
    path: DASHBOARD_PAGE,
    element: IndexPage,
    index: true,
    title: "title.dashboard",
    icon: icon("ic_analytics"),
  },
  {
    path: PROFILE_PAGE,
    element: ProfilePage,
    title: "title.profile",
    icon: icon("ic_profile"),
  },
  { path: USER_PAGE, element: UserPage, title: "title.user", icon: icon("ic_user") },
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
    title: "title.notification",
    icon: icon("ic_blog"),
  },
  {
    path: NEW_NOTIFICATION,
    element: NewNotificationPage,
    title: "title.notification",
    isHiddenMenu: true,
  },
  {
    path: DETAIL_NOTIFICATION,
    element: NewNotificationPage,
    title: "title.notification",
    isHiddenMenu: true,
  },
  {
    path: CONTACT_ADMIN,
    element: ContactAdminPage,
    title: "title.contactAdmin",
    icon: icon("ic_contact-admin"),
  },
  {
    path: NEW_USER,
    element: UserFormPage,
    isHiddenMenu: true,
  },
  {
    path: UPDATE_USER,
    element: UserFormPage,
    isHiddenMenu: true,
  },
  {
    path: SEMESTER_PAGE,
    element: SemesterPage,
    title: "title.semester",
    icon: icon("ic_semester"),
  },
  {
    path: NEW_SEMESTER,
    element: NewSemesterPage,
    isHiddenMenu: true
  },
  {
    path: DETAIL_SEMESTER,
    element: SemesterDetailPage,
    isHiddenMenu: true
  },
  {
    path: POINT_PAGE,
    element: PointPage,
    title: "title.point",
    icon: icon("ic_point"),
  },
  {
    path: MAP_PAGE,
    element: MapPage,
    title: "title.map",
    icon: icon("ic_map"),
  },
];
