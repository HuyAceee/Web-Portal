import { Fragment, useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import Iconify from "components/Iconify";
import Scrollbar from "components/Scrollbar";
import { BLOG_PAGE } from "constant/router";
import dayjs from "dayjs";
import type { NotificationModel } from "models/view/notification";
import { useNavigate } from "react-router-dom";
import { NotificationService } from "services/notification";
import { convertImageUrl } from "utils/common";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);

  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const getNotification = async () => {
    try {
      const data = await NotificationService.getList();
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <IconButton color={open ? "primary" : "default"} onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ height: "75vh" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{t("notification.title.default")}</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClose={handleClose}
              />
            ))}
          </List>
        </Scrollbar>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

interface NotificationItemProps {
  notification: NotificationModel;
  onClose: () => void;
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const title = renderContent(notification);
  const navigate = useNavigate();

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ":hover": {
          bgcolor: "action.selected",
        },
      }}
      onClick={() => {
        navigate(BLOG_PAGE);
        onClose();
      }}
    >
      <ListItemAvatar>
        <Avatar src={convertImageUrl(notification.imageUrl)} sx={{ bgcolor: "background.neutral" }}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {dayjs(notification.startDate).format('YYYY-MM-DD')} - {dayjs(notification.endDate).format('YYYY-MM-DD')}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

function renderContent(notification: NotificationModel) {
  return (
    <Fragment>
      <Typography variant="subtitle2">{notification.title}</Typography>
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        {notification.description}
      </Typography>
    </Fragment>
  );
}
