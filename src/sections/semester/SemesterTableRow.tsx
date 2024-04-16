import { IconButton, Popover, MenuItem } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Iconify from "components/Iconify";
import { DETAIL_SEMESTER } from "constant/router";
import { t } from "i18next";
import type { SemesterFormModel } from "models/view/semester";
import { useState } from "react";
import { useRouter } from "routes/hooks";
import { convertObjectToQueryString } from "utils/common";
import { formatDate_YYYY_MM_DD } from "utils/formatTime";

// ----------------------------------------------------------------------

interface SemesterTableRowProps {
  data: SemesterFormModel;
}

export default function SemesterTableRow({ data }: SemesterTableRowProps) {
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRedirectDetailSemesters = () => {
    handleCloseMenu();
    router.push(
      DETAIL_SEMESTER +
        "?" +
        convertObjectToQueryString({
          id: data.id?.toString() ?? '',
        })
    );
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell align="center">{data?.classroomName}</TableCell>

        <TableCell align="center">
          {formatDate_YYYY_MM_DD(data.startDate ?? "")}
        </TableCell>

        <TableCell align="center">
          {formatDate_YYYY_MM_DD(data.endDate ?? "")}
        </TableCell>

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
        <MenuItem onClick={handleRedirectDetailSemesters}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          {t("action.edit")}
        </MenuItem>
      </Popover>
    </>
  );
}
