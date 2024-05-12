import {
  Box,
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
import { ROLE } from "constant/key";
import { NEW_SEMESTER } from "constant/router";
import { LoadingContext } from "contexts/LoadingContext";
import type { HeaderLabelModel } from "models/common";
import type { ClassroomModel } from "models/view/classroom";
import Calendar from "pages/Calendar";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouterLink } from "routes/components";
import TableEmptyRows from "sections/user/TableEmptyRows";
import TableNoData from "sections/user/TableNoData";
import UserTableHead from "sections/user/UserTableHead";
import { emptyRows } from "sections/user/utils";
import { ClassroomService } from "services/classroom";
import { getDays, isAdmin } from "utils/common";
import { convertDate } from "utils/formatTime";
import { handleLocalStorage } from "utils/localStorage";
import SemesterTableRow from "../SemesterTableRow";
import type { SemesterFormModel } from "models/view/semester";
import { ColorLens } from "@mui/icons-material";
import { typeOptions } from "../SemesterForm";

// ----------------------------------------------------------------------

const HeaderLabel: HeaderLabelModel[] = [
  { id: "classroomName", label: "semester.table.header.classroomId" },
  { id: "startDate", label: "semester.table.header.startDate" },
  { id: "endDate", label: "semester.table.header.endDate" },
  { id: "", label: "" },
];

interface Props {
  semesters: SemesterFormModel[];
}

export default function SemesterView({ semesters = [] }: Props) {
  const { t } = useTranslation();
  const { getLocalStorage } = handleLocalStorage();
  const { loading } = useContext(LoadingContext);
  const [classroom, setClassroom] = useState<ClassroomModel[]>([]);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const getClassroom = async () => {
    try {
      const data = await ClassroomService.getList();
      setClassroom(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassroom();
  }, []);

  const semestersMapping = useMemo(() => {
    return semesters.map((semester) => {
      const classroomName = classroom.find(
        (elem) => elem.id === semester.classroomId
      )?.name;
      return {
        ...semester,
        classroomName,
      };
    });
  }, [semesters, classroom]);

  const hourStart = [9, 10, 12, 14, 16, 18];
  const minuteStart = [0, 40, 40, 20, 20, 0];
  const hourEnd = [10, 12, 14, 15, 17, 19];
  const minuteEnd = [30, 10, 10, 50, 50, 30];
  const colors = ["#7E57C2", "#FF7043", "#FFA726"];

  const dateCalendar = useMemo(() => {
    let result: any[] = [];
    let ownerId = 0;
    let teachers: any[] = [];
    semesters.forEach((semester) => {
      semester.listSubject.forEach((subject) => {
        subject.listSubjectTime.forEach((subjectTime) => {
          teachers = [
            ...teachers,
            {
              id: ownerId,
              text: subjectTime.teacherName,
              color: colors[subjectTime.type % 5],
            },
          ];
          const temp = getDays(
            new Date(convertDate((semester.startDate as string) ?? "")),
            new Date(convertDate((semester.endDate as string) ?? "")),
            subjectTime.weekday
          );
          const temp1 = temp.map((_, index) => {
            return {
              id: index,
              ownerId,
              title: subject.name + `( ${subjectTime.className} )`,
              startDate: new Date(
                _.getFullYear(),
                _.getMonth(),
                _.getDate(),
                hourStart[subjectTime.period],
                minuteStart[subjectTime.period]
              ),
              endDate: new Date(
                _.getFullYear(),
                _.getMonth(),
                _.getDate(),
                hourEnd[subjectTime.period],
                minuteEnd[subjectTime.period]
              ),
            };
          });
          result = [...result, ...temp1];
          ownerId++;
        });
      });
    });
    return { result, teachers };
  }, [semesters]);

  if (!isAdmin(getLocalStorage(ROLE))) {
    return (
      <Box>
        <Calendar data={dateCalendar.result} teachers={dateCalendar.teachers} />
        <Box mt={3} sx={{ display: "flex", flexDirection: "column" }} gap={1}>
          {colors.map((color, index) => {
            return (
              <Box key={index} sx={{ display: "flex", flexDirection: "row" }} gap={1}>
                <Box
                  height={20}
                  width={20}
                  bgcolor={color}
                  sx={{ borderRadius: 1 }}
                ></Box>
                <Typography>{t(typeOptions[index].label)}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

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
                {semestersMapping
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
          labelRowsPerPage={t("table.rowsPerPage")}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
