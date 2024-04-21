import Input from '@mui/material/Input';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { SubjectPointModel } from "models/view/point";

const ariaLabel = { 'aria-label': 'description' };

// ----------------------------------------------------------------------

interface PointTableRowProps {
  data: SubjectPointModel;
  isEdit: boolean;
  isAdmin: boolean;
  idx: number;
  handleEditPoint: (index: number, value: any) => void
}

export default function PointTableRow({ data, isEdit, idx, handleEditPoint, isAdmin }: PointTableRowProps) {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" sx={{ height: "70px" }}>
        {isAdmin && <TableCell align="center">{data?.name}</TableCell>}
        <TableCell align="center">{data?.subjectName}</TableCell>

        <TableCell align="center">
          {isEdit ? (
            <Input maxRows={2} sx={{ width: "40px" }} type='number' value={data.point} inputProps={ariaLabel} onChange={(event: any) => handleEditPoint(idx, event?.target?.value)} />
          ) : (
            data.point
          )}
        </TableCell>

        <TableCell align="center">
          {data.startDate}
        </TableCell>

        <TableCell align="center">
          {data.endDate}
        </TableCell>
      </TableRow>
    </>
  );
}
