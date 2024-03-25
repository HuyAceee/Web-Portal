import { useState } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Label from "components/label/Label";
import Iconify from "components/Iconify";
import type { UserInformationModel } from "models/view/user";
import { convertImageUrl } from "utils/common";
import { fDate } from "utils/formatTime";

// ----------------------------------------------------------------------

interface UserTableRowProps {
  data: UserInformationModel;
  selected: boolean;
  handleClick: (event: any) => void;
}

export default function UserTableRow({
  data,
  handleClick,
  selected,
}: UserTableRowProps) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={data.name} src={convertImageUrl(data.imageUrl)} />
            <Typography variant="subtitle2" noWrap>
              {data.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{data.email}</TableCell>

        <TableCell>{fDate(data.birthDate, "YYYY-MM-DD")}</TableCell>

        <TableCell align="center">
          {data.isFemale ? "Female" : "Male"}
        </TableCell>

        <TableCell>{data.phoneNumber}</TableCell>

        <TableCell align="right">
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
