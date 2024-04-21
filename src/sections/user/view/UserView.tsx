import { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";

import Iconify from "components/Iconify";
import Scrollbar from "components/Scrollbar";

import { NEW_USER } from "constant/router";
import { LoadingContext } from "contexts/LoadingContext";
import type { HeaderLabelModel } from "models/common";
import type { UserInformationModel } from "models/view/user";
import { useTranslation } from "react-i18next";
import { RouterLink } from "routes/components";
import { UserService } from "services/user";
import TableEmptyRows from "../TableEmptyRows";
import TableNoData from "../TableNoData";
import UserTableHead from "../UserTableHead";
import UserTableRow from "../UserTableRow";
import { emptyRows } from "../utils";

// ----------------------------------------------------------------------

const HeaderLabel: HeaderLabelModel[] = [
  { id: "name", label: "user.table.header.name" },
  { id: "email", label: "user.table.header.email" },
  { id: "birthDate", label: "user.table.header.birthday" },
  { id: "isFemale", label: "user.table.header.gender" },
  { id: "phoneNumber", label: "user.table.header.phoneNumber" },
  { id: "" },
];

export default function UserPage() {
  const { t } = useTranslation();
  const { openLoading, closeLoading, loading } = useContext(LoadingContext);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState<UserInformationModel[]>([]);

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

  const getUsers = async () => {
    try {
      openLoading();
      const { data } = await UserService.getList();
      setUsers(data);
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">{t("user.title")}</Typography>

        <RouterLink href={NEW_USER}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            {t("user.button.newUser")}
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
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow key={index} data={row} fetchData={getUsers} />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />
                {!users.length && !loading && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage={t("table.rowsPerPage")}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
