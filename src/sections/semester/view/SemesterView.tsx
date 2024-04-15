import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import Iconify from "components/Iconify";
import Scrollbar from "components/Scrollbar";
import { NEW_SEMESTER } from "constant/router";
import { LoadingContext } from "contexts/LoadingContext";
import type { HeaderLabelModel } from "models/common";
import type { SemesterFormModel } from "models/view/semester";
import type { UserInformationModel } from "models/view/user";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RouterLink } from "routes/components";
import TableEmptyRows from "sections/user/TableEmptyRows";
import TableNoData from "sections/user/TableNoData";
import UserTableHead from "sections/user/UserTableHead";
import UserTableRow from "sections/user/UserTableRow";
import { emptyRows } from "sections/user/utils";
import { SemesterService } from "services/semester";
import SemesterTableRow from "../SemesterTableRow";

// ----------------------------------------------------------------------

const HeaderLabel: HeaderLabelModel[] = [
  { id: "classroomId", label: "semester.table.header.classroomId" },
  { id: "startDate", label: "semester.table.header.startDate" },
  { id: "endDate", label: "semester.table.header.endDate" },
];

export default function SemesterView() {
  const { t } = useTranslation();
  const { openLoading, closeLoading, loading } = useContext(LoadingContext);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [semesters, setSemesters] = useState<SemesterFormModel[]>([]);

  const handleSort = (_event: any, id: string) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const getSemester = async () => {
    try {
      openLoading();
      const { data } = await SemesterService.listForUser();
      setSemesters(data);
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    getSemester();
  }, []);

  return (
    <Container>
      <Stack
        sx={{ pb: 3 }}
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">{t("semester.list.title")}</Typography>
        <RouterLink href={NEW_SEMESTER}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            {t("semester.list.addNew")}
          </Button>
        </RouterLink>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={HeaderLabel}
              />
              <TableBody>
                {semesters
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <SemesterTableRow key={index} data={row} />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, semesters.length)}
                />
                {!semesters.length && !loading && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={semesters.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
