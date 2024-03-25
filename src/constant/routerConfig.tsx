import { LazyExoticComponent, lazy } from "react";
import {
  BLOG_PAGE,
  CHANGE_PASSWORD_PAGE,
  CONTACT_ADMIN,
  NOTIFICATION,
  PRODUCTS_PAGE,
  PROFILE_PAGE,
  USER_PAGE,
} from "./router";
import SvgColor from "components/SvgColor";

export const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const IndexPage = lazy(() => import("pages/App"));
const UserPage = lazy(() => import("pages/User"));
const BlogPage = lazy(() => import("pages/Blog"));
const ProductsPage = lazy(() => import("pages/Products"));
const ProfilePage = lazy(() => import("pages/Profile"));
const ChangePasswordPage = lazy(() => import("pages/ChangePassword"));
const ContactAdminPage = lazy(() => import("pages/user/ContactAdmin"));
const NotificationPage = lazy(() => import("pages/admin/Notification"));

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
    path: "/",
    element: IndexPage,
    index: true,
    title: "dashboard",
    icon: icon("ic_analytics"),
  },
  { path: PROFILE_PAGE, element: ProfilePage, title: "profile", icon: icon("ic_profile"), },
  { path: CHANGE_PASSWORD_PAGE, element: ChangePasswordPage, isHiddenMenu: true },
  { path: CONTACT_ADMIN, element: ContactAdminPage, title: "contact", icon: icon("ic_contact-admin"), },
];

export const routerAdmin: RouterItemModel[] = [
  {
    path: "/",
    element: IndexPage,
    index: true,
    title: "dashboard",
    icon: icon("ic_analytics"),
  },
  { path: PROFILE_PAGE, element: ProfilePage, title: "profile", icon: icon("ic_profile"), },
  { path: USER_PAGE, element: UserPage, title: "user", icon: icon("ic_user") },
  {
    path: PRODUCTS_PAGE,
    element: ProductsPage,
    title: "product",
    icon: icon("ic_cart"),
  },
  { path: CHANGE_PASSWORD_PAGE, element: ChangePasswordPage, isHiddenMenu: true },
  { path: BLOG_PAGE, element: BlogPage, title: "blog", icon: icon("ic_blog") },
  { path: NOTIFICATION, element: NotificationPage, title: "notification", icon: icon("ic_blog") },
  { path: CONTACT_ADMIN, element: ContactAdminPage, title: "contact", icon: icon("ic_contact-admin"), },
];
