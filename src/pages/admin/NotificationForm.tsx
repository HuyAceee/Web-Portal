import { LoadingContext } from "contexts/LoadingContext";
import type { NotificationModel } from "models/view/notification";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { usePathname } from "routes/hooks";
import NotificationView from "sections/notification/view/NotificationView";
import { NotificationService } from "services/notification";

// ----------------------------------------------------------------------

interface NotificationFormQueriesModel {
  id?: string;
}

export default function NotificationFormPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { closeLoading, openLoading, loading } = useContext(LoadingContext);
  const [notificationDetail, setNotificationDetail] =
    useState<NotificationModel | undefined>(undefined);
  const allParams: NotificationFormQueriesModel = Object.fromEntries(
    searchParams as unknown as Iterable<readonly any[]>
  );

  const getUserDetail = async () => {
    try {
      openLoading();
      const data = await NotificationService.getDetail(allParams.id as string);
      setNotificationDetail(data);
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    if (allParams.id) {
      getUserDetail();
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> {t("title.notification")}</title>
      </Helmet>

      <NotificationView data={notificationDetail} />
    </>
  );
}
