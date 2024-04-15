import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Iconify from "components/Iconify";
import { UPDATE_USER } from "constant/router";
import { DialogContext } from "contexts/DialogContext";
import { LoadingContext } from "contexts/LoadingContext";
import type { UserInformationModel } from "models/view/user";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "routes/hooks";
import { UserService } from "services/user";
import { convertImageUrl, convertObjectToQueryString } from "utils/common";
import { formatDate_YYYY_MM_DD } from "utils/formatTime";

// ----------------------------------------------------------------------

interface UserTableRowProps {
  data: UserInformationModel;
  fetchData: () => Promise<void>;
}

export default function UserTableRow({ data, fetchData }: UserTableRowProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const { openDialog } = useContext(DialogContext);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRedirectEditUser = () => {
    handleCloseMenu();
    router.push(
      UPDATE_USER +
        "?" +
        convertObjectToQueryString({
          email: data.email,
        })
    );
  };

  const handleDeleteUser = () => {
    handleCloseMenu();
    openDialog?.({
      title: "notification.title.confirmDelete",
      content: "notification.content.confirmDelete",
      onConfirm: async () => {
        try {
          openLoading();
          await UserService.delete(data.email);
          enqueueSnackbar(t("notification.title.success"), {
            variant: "success",
          });
          await fetchData();
        } catch (error) {
          enqueueSnackbar(t("notification.title.fail"), {
            variant: "error",
          });
        } finally {
          closeLoading();
        }
      },
    });
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component="th" scope="row" padding="none" align="center">
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="center"
          >
            <Avatar alt={data.name} src={convertImageUrl(data.imageUrl)} />
            <Typography variant="subtitle2" noWrap>
              {data.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">{data.email}</TableCell>

        <TableCell align="center">
          {formatDate_YYYY_MM_DD(data.birthDate ?? '')}
        </TableCell>

        <TableCell align="center">
          {data.isFemale
            ? t("profile.options.gender.female")
            : t("profile.options.gender.male")}
        </TableCell>

        <TableCell align="center">{data.phoneNumber}</TableCell>

        <TableCell align="right" width={20}>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleRedirectEditUser}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          {t("action.edit")}
        </MenuItem>

        <MenuItem onClick={handleDeleteUser} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          {t("action.delete")}
        </MenuItem>
      </Popover>
    </>
  );
}
