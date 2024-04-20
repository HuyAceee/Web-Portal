import {
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography
} from "@mui/material";
import Scrollbar from "components/Scrollbar";
import { ROLE } from "constant/key";
import { LoadingContext } from "contexts/LoadingContext";
import type { HeaderLabelModel } from "models/common";
import type { SemesterPointModel, SubjectPointModel } from "models/view/point";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PointTableRow from "sections/point/PointTableRow";
import TableEmptyRows from "sections/user/TableEmptyRows";
import TableNoData from "sections/user/TableNoData";
import UserTableHead from "sections/user/UserTableHead";
import { emptyRows } from "sections/user/utils";
import { PointService } from "services/point";
import { isAdmin } from "utils/common";
import { handleLocalStorage } from "utils/localStorage";

// ----------------------------------------------------------------------

const HeaderLabel: HeaderLabelModel[] = [
  { id: "sunjectName", label: "point.list.subjectName" },
  { id: "point", label: "point.list.point" },
  { id: "startDate", label: "semester.table.header.startDate" },
  { id: "endDate", label: "semester.table.header.endDate" },
];

export default function PointView() {
  const { t } = useTranslation();
  const { getLocalStorage } = handleLocalStorage();
  const { openLoading, closeLoading, loading } = useContext(LoadingContext);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [orderBy, setOrderBy] = useState("sunjectName");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [points, setPoints] = useState<SubjectPointModel[]>([
    {
      id: 1,
      point: 10,
      subjectName: "abc",
    },
  ]);

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

  const convertDataTable = (
    data: SemesterPointModel[]
  ): SubjectPointModel[] => {
    let response: SubjectPointModel[] = [];
    data.forEach((item) => {
      item.listSubjectPoint.forEach((point) => {
        response.push({
          ...point,
          startDate: item.startDate,
          endDate: item.endDate,
        });
      });
    });
    return response;
  };

  const getPoint = async () => {
    try {
      openLoading();
      let response: SubjectPointModel[] = [];
      if (isAdmin(getLocalStorage(ROLE))) {
        const { data } = await PointService.getListForAdmin();
        response = convertDataTable(data);
      } else {
        const { data } = await PointService.getListForUser();
        response = convertDataTable(data);
      }
      setPoints(response);
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    getPoint();
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
        <Typography variant="h4">{t("point.list.title")}</Typography>
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
                {points
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <PointTableRow key={index} data={row} />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, points.length)}
                />
                {!points.length && !loading && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={points.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
