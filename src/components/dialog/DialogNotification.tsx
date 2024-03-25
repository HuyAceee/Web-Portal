import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogNotificationProps {
  title: string;
  content: string;
  textConfirm?: string;
  textCancel?: string;
  open: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function DialogNotification({
  content,
  title,
  open,
  onCancel,
  onConfirm,
  textCancel,
  textConfirm,
}: DialogNotificationProps) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCancel}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogTitle>{t(title)}</DialogTitle>
        <DialogContent sx={{ maxWidth: 500 }}>
          <DialogContentText id="alert-dialog-slide-description">
            {t(content)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>{t(textCancel ?? 'notification.button.cancel')}</Button>
          <Button onClick={onConfirm}>{t(textConfirm ?? 'notification.button.agree')}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
