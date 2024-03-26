import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function TableNoData() {
  const { t } = useTranslation()
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            {t("user.notFound")}
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}
