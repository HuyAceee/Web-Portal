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
import type { SemesterFormModel } from "models/view/semester";
import type { UserInformationModel } from "models/view/user";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "routes/hooks";
import { UserService } from "services/user";
import { convertImageUrl, convertObjectToQueryString } from "utils/common";
import { formatDate_YYYY_MM_DD } from "utils/formatTime";

// ----------------------------------------------------------------------

interface SemesterTableRowProps {
  data: SemesterFormModel;
}

export default function SemesterTableRow({ data }: SemesterTableRowProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell align="center">{data.classroomId}</TableCell>

        <TableCell align="center">
          {formatDate_YYYY_MM_DD(data.startDate ?? "")}
        </TableCell>

        <TableCell align="center">{formatDate_YYYY_MM_DD(data.endDate ?? "")}</TableCell>
      </TableRow>
    </>
  );
}
