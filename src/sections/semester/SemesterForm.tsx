"use client";

import {
  Box,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";
import { SEMESTER_PAGE } from "constant/router";
import { fieldRequired } from "constant/validation";
import { DialogContext } from "contexts/DialogContext";
import { LoadingContext } from "contexts/LoadingContext";
import dayjs from "dayjs";
import { Field, FormikProvider, useFormik } from "formik";
import type { ClassroomModel } from "models/view/classroom";
import {
  SubjectTimeTypeEnum,
  type SemesterFormModel,
  type SubjectModel,
  type SubjectTimeModel,
} from "models/view/semester";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "routes/hooks";
import { ClassroomService } from "services/classroom";
import { SemesterService } from "services/semester";
import { getEndDay, getFirstDay } from "utils/common";
import * as Yup from "yup";

export const typeOptions = [
  {
    label: "semester.form.park",
    value: SubjectTimeTypeEnum.PRAK,
  },
  {
    label: "semester.form.lab",
    value: SubjectTimeTypeEnum.LAB,
  },
  {
    label: "semester.form.lecturePack",
    value: SubjectTimeTypeEnum.LECTURE_PARK,
  },
];

// const weekOptions = [
//   {
//     label: "Chẵn",
//     value: 0,
//   },
//   {
//     label: "Lẻ",
//     value: 1,
//   },
// ];

const weekdayOptions = [
  {
    label: "semester.form.monday",
    value: 0,
  },
  {
    label: "semester.form.tuesday",
    value: 1,
  },
  {
    label: "semester.form.wednesday",
    value: 2,
  },
  {
    label: "semester.form.thursday",
    value: 3,
  },
  {
    label: "semester.form.friday",
    value: 4,
  },
  {
    label: "semester.form.saturday",
    value: 5,
  },
];

const periodOptions = [
  {
    label: "09:00 - 10:30",
    value: 0,
  },
  {
    label: "10:40 - 12:10",
    value: 1,
  },
  {
    label: "12:40 - 14:10",
    value: 2,
  },
  {
    label: "14:20 - 15:50",
    value: 3,
  },
  {
    label: "16:20 - 17:50",
    value: 4,
  },
  {
    label: "18:00 - 19:30",
    value: 5,
  },
];

interface SemesterFormProps {
  defaultData?: SemesterFormModel;
}

export function SemesterForm({ defaultData }: SemesterFormProps): JSX.Element {
  const { t } = useTranslation();
  const { openDialog } = useContext(DialogContext);
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [classrooms, setClassrooms] = useState<ClassroomModel[]>([]);
  const year = new Date().getFullYear();
  const [semester, setSemester] = useState(`${year}_01`);

  const semesterList = useMemo(() => {
    let result: any[] = [];
    const years = Array.from({ length: 5 }, (_, i) => i + year);
    years.forEach((y) => {
      result = result.concat([
        {
          label: `${y}_01`,
          value: `${y}_01`,
        },
        {
          label: `${y}_02`,
          value: `${y}_02`,
        },
      ]);
    });
    return result;
  }, []);

  const getClassroom = async () => {
    try {
      const data = await ClassroomService.getList();
      setClassrooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik<SemesterFormModel>({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      ...defaultData,
      startDate: getFirstDay(year, 9) * 1000,
      endDate: getFirstDay(year + 1, 2) * 1000,
      listSubject: defaultData?.listSubject ?? [],
    } as SemesterFormModel,
    validationSchema: Yup.object({
      classroomId: Yup.number().required(t(fieldRequired)),
      startDate: Yup.string().required(t(fieldRequired)),
      endDate: Yup.string().required(t(fieldRequired)),
      listSubject: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required(t(fieldRequired)),
          listSubjectTime: Yup.array().of(
            Yup.object().shape({
              type: Yup.number().required(t(fieldRequired)),
              teacherName: Yup.string().required(t(fieldRequired)),
              className: Yup.string().required(t(fieldRequired)),
              weekday: Yup.number().required(t(fieldRequired)),
              period: Yup.number().required(t(fieldRequired)),
            })
          ),
        })
      ),
    }),
    onSubmit: async (value) => {
      try {
        openLoading();
        await SemesterService.create({
          ...value,
          startDate: value.startDate || dayjs().valueOf(),
          endDate: value.endDate || dayjs().valueOf(),
        });
        enqueueSnackbar(t("notification.title.success"), {
          variant: "success",
        });
        router.push(SEMESTER_PAGE);
      } catch (error) {
      } finally {
        closeLoading();
      }
    },
  });

  const {
    errors: errorsValidate,
    handleChange,
    values,
    handleSubmit,
    touched,
    setFieldValue,
    setValues,
  } = formik;

  const errors = errorsValidate as any;

  useEffect(() => {
    getClassroom();
  }, []);

  const isDetail = useMemo(() => {
    return !!defaultData?.id;
  }, [defaultData]);

  const handleChangeSubjectTimeField = (
    subjectIndex: number,
    subjectTimeIndex: number,
    value: any,
    key: keyof SubjectTimeModel
  ) => {
    setValues({
      ...values,
      listSubject: values?.listSubject?.map((subject, idx) =>
        subjectIndex === idx
          ? {
              ...subject,
              listSubjectTime: subject?.listSubjectTime?.map(
                (subjectTime, i) =>
                  i === subjectTimeIndex
                    ? ({
                        ...subjectTime,
                        [key]: ["type", "week", "weekday", "period"].includes(
                          key
                        )
                          ? Number(value)
                          : value,
                      } as SubjectTimeModel)
                    : subjectTime
              ) as SubjectTimeModel[],
            }
          : subject
      ),
    });
  };

  const handleChangeSemester = (value: string) => {
    setSemester(value);
    const [year, month] = value?.split("_");
    if (month === '01') {
      setFieldValue("startDate", getFirstDay(year, 9) * 1000);
      setFieldValue("endDate", getEndDay(year + 1, 2) * 1000);
    } else {
      setFieldValue("startDate", getFirstDay(year, 3) * 1000);
      setFieldValue("endDate", getEndDay(year, 7) * 1000);
    }
  };

  return (
    <Card>
      <CardHeader
        subheader={t("semester.list.title")}
        title={t("semester.form.title")}
      />
      <Divider />
      <FormikProvider value={formik}>
        <CardContent>
          <Grid container spacing={3} pb={3} mt={1}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>{t("semester.list.title")}</InputLabel>
                <Select
                  disabled={isDetail}
                  value={semester}
                  onChange={(event) =>
                    handleChangeSemester(event.target?.value)
                  }
                  variant="outlined"
                >
                  {semesterList.map((semester, index) => (
                    <MenuItem key={index.toString()} value={semester.value}>
                      {semester.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={12} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>{t("semester.form.classroom")}</InputLabel>
                <Select
                  label="State"
                  name="classroomId"
                  disabled={isDetail}
                  value={values?.classroomId}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!errors.classroomId && touched.classroomId}
                >
                  {classrooms.map((classroom, index) => (
                    <MenuItem key={index.toString()} value={classroom.id}>
                      {t(classroom.name)}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.classroomId && touched.classroomId && (
                  <FormHelperText error id="accountId-error">
                    {errors.classroomId}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            disabled={isDetail}
            onClick={() => {
              setValues({
                ...values,
                listSubject: [...values?.listSubject, {} as SubjectModel],
              });
            }}
          >
            {t("semester.form.addSubject")}
          </Button>
          {values?.listSubject?.map((subject, index) => (
            <div key={index}>
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: "20px" }}
                alignItems="center"
              >
                <h3>{t("semester.form.subjectIndex", { index: index + 1 })}</h3>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isDetail}
                  size="small"
                  sx={{ height: "30px" }}
                  onClick={() => {
                    const newListSubject = values?.listSubject?.filter(
                      (_, i) => i !== index
                    );
                    setValues({
                      ...values,
                      listSubject: newListSubject,
                    });
                  }}
                >
                  {t("action.delete")}
                </Button>
              </Box>
              <Field
                name={`listSubject[${index}].name`}
                component={TextField}
                disabled={isDetail}
                onChange={(event: any) =>
                  setValues({
                    ...values,
                    listSubject: values?.listSubject?.map((subject, idx) =>
                      index === idx
                        ? {
                            ...subject,
                            name: event.target.value,
                          }
                        : subject
                    ),
                  })
                }
                value={subject.name}
                label={t("semester.form.subjectName")}
                error={
                  errors.listSubject &&
                  errors.listSubject[index] &&
                  errors.listSubject[index].name
                }
                helperText={
                  errors.listSubject &&
                  errors.listSubject[index] &&
                  errors.listSubject[index].name
                }
              />
              <div>
                <h4>{t("semester.form.subjectTime")}</h4>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isDetail}
                  size="small"
                  onClick={() => {
                    setValues({
                      ...values,
                      listSubject: values?.listSubject?.map((sub, subIndex) =>
                        subIndex === index
                          ? {
                              ...sub,
                              listSubjectTime: [
                                ...(sub?.listSubjectTime
                                  ? sub?.listSubjectTime
                                  : []),
                                { week: 0 } as SubjectTimeModel,
                              ],
                            }
                          : sub
                      ),
                    });
                  }}
                >
                  {t("semester.form.addSubjectTime")}
                </Button>
                {subject?.listSubjectTime?.map((time, timeIndex) => (
                  <div key={timeIndex}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                      }}
                      alignItems="center"
                    >
                      <h3>
                        {t("semester.form.subjectTimeIndex", {
                          index: timeIndex + 1,
                        })}
                      </h3>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        disabled={isDetail}
                        sx={{ height: "30px" }}
                        onClick={() => {
                          const newListSubjectTime = values?.listSubject[
                            index
                          ]?.listSubjectTime?.filter((_, i) => i !== timeIndex);
                          setValues({
                            ...values,
                            listSubject: values?.listSubject?.map(
                              (sub, subIndex) =>
                                subIndex === index
                                  ? {
                                      ...sub,
                                      listSubjectTime: newListSubjectTime,
                                    }
                                  : sub
                            ),
                          });
                        }}
                      >
                        {t("action.delete")}
                      </Button>
                    </Box>
                    <Grid spacing={3}>
                      <FormControl required sx={{ flex: 1 }}>
                        <InputLabel>{t("semester.form.type")}</InputLabel>
                        <Select
                          label={t("semester.form.type")}
                          value={time.type}
                          disabled={isDetail}
                          sx={{ width: 220, mr: 2 }}
                          onChange={(event: any) => {
                            handleChangeSubjectTimeField(
                              index,
                              timeIndex,
                              event.target.value,
                              "type"
                            );
                          }}
                          variant="outlined"
                          error={
                            errors.listSubject &&
                            errors.listSubject[index] &&
                            errors.listSubject[index].listSubjectTime &&
                            errors.listSubject[index].listSubjectTime[
                              timeIndex
                            ] &&
                            errors.listSubject[index].listSubjectTime[timeIndex]
                              .type
                          }
                        >
                          {typeOptions.map((option, index) => (
                            <MenuItem
                              key={index.toString()}
                              value={option.value}
                            >
                              {t(option.label)}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.listSubject &&
                          errors.listSubject[index] &&
                          errors.listSubject[index].listSubjectTime &&
                          errors.listSubject[index].listSubjectTime[
                            timeIndex
                          ] &&
                          errors.listSubject[index].listSubjectTime[timeIndex]
                            .type && (
                            <FormHelperText error id="accountId-error">
                              {errors.classroom}
                            </FormHelperText>
                          )}
                      </FormControl>
                      <TextField
                        label={t("semester.form.teacherName")}
                        value={time.teacherName}
                        disabled={isDetail}
                        sx={{ pr: 2 }}
                        onChange={(event: any) => {
                          handleChangeSubjectTimeField(
                            index,
                            timeIndex,
                            event.target.value,
                            "teacherName"
                          );
                        }}
                        error={
                          errors.listSubject &&
                          errors.listSubject[index] &&
                          errors.listSubject[index].listSubjectTime &&
                          errors.listSubject[index].listSubjectTime[
                            timeIndex
                          ] &&
                          errors.listSubject[index].listSubjectTime[timeIndex]
                            .teacherName
                        }
                        helperText={
                          errors.listSubject &&
                          errors.listSubject[index] &&
                          errors.listSubject[index].listSubjectTime &&
                          errors.listSubject[index].listSubjectTime[
                            timeIndex
                          ] &&
                          errors.listSubject[index].listSubjectTime[timeIndex]
                            .teacherName
                        }
                      />
                      <TextField
                        label={t("semester.form.className")}
                        value={time.className}
                        sx={{ pr: 2 }}
                        disabled={isDetail}
                        onChange={(event: any) => {
                          handleChangeSubjectTimeField(
                            index,
                            timeIndex,
                            event.target.value,
                            "className"
                          );
                        }}
                        error={
                          errors.listSubject &&
                          errors.listSubject[index] &&
                          errors.listSubject[index].listSubjectTime &&
                          errors.listSubject[index].listSubjectTime[
                            timeIndex
                          ] &&
                          errors.listSubject[index].listSubjectTime[timeIndex]
                            .className
                        }
                        helperText={
                          errors.listSubject &&
                          errors.listSubject[index] &&
                          errors.listSubject[index].listSubjectTime &&
                          errors.listSubject[index].listSubjectTime[
                            timeIndex
                          ] &&
                          errors.listSubject[index].listSubjectTime[timeIndex]
                            .className
                        }
                      />
                      {/* <FormControl required sx={{ flex: 1 }}>
                        <InputLabel>{t("semester.form.week")}</InputLabel>
                        <Select
                          label={t("semester.form.week")}
                          value={time.week}
                          disabled={isDetail}
                          sx={{ width: 220, mr: 2 }}
                          onChange={(event: any) => {
                            handleChangeSubjectTimeField(
                              index,
                              timeIndex,
                              event.target.value,
                              "week"
                            );
                          }}
                          variant="outlined"
                          error={
                            errors.listSubject &&
                            errors.listSubject[index] &&
                            errors.listSubject[index].listSubjectTime &&
                            errors.listSubject[index].listSubjectTime[
                              timeIndex
                            ] &&
                            errors.listSubject[index].listSubjectTime[timeIndex]
                              .week
                          }
                        >
                          {weekOptions.map((option, index) => (
                            <MenuItem
                              key={index.toString()}
                              value={option.value}
                            >
                              {t(option.label)}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.listSubject &&
                          errors.listSubject[index] &&
                          errors.listSubject[index].listSubjectTime &&
                          errors.listSubject[index].listSubjectTime[
                            timeIndex
                          ] &&
                          errors.listSubject[index].listSubjectTime[timeIndex]
                            .week && (
                            <FormHelperText error id="accountId-error">
                              {errors.classroom}
                            </FormHelperText>
                          )}
                      </FormControl> */}
                      <FormControl required sx={{ flex: 1 }}>
                        <InputLabel>{t("semester.form.weekday")}</InputLabel>
                        <Select
                          label={t("semester.form.weekday")}
                          value={time.weekday}
                          disabled={isDetail}
                          sx={{ width: 220, mr: 2 }}
                          onChange={(event: any) => {
                            handleChangeSubjectTimeField(
                              index,
                              timeIndex,
                              event.target.value,
                              "weekday"
                            );
                          }}
                          variant="outlined"
                          error={
                            errors.listSubject &&
                            errors.listSubject[index] &&
                            errors.listSubject[index].listSubjectTime &&
                            errors.listSubject[index].listSubjectTime[
                              timeIndex
                            ] &&
                            errors.listSubject[index].listSubjectTime[timeIndex]
                              .weekday
                          }
                        >
                          {weekdayOptions.map((option, index) => (
                            <MenuItem
                              key={index.toString()}
                              value={option.value}
                            >
                              {t(option.label)}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.listSubject &&
                          errors.listSubject[index] &&
                          errors.listSubject[index].listSubjectTime &&
                          errors.listSubject[index].listSubjectTime[
                            timeIndex
                          ] &&
                          errors.listSubject[index].listSubjectTime[timeIndex]
                            .weekday && (
                            <FormHelperText error id="accountId-error">
                              {errors.classroom}
                            </FormHelperText>
                          )}
                      </FormControl>
                      <FormControl required sx={{ flex: 1 }}>
                        <InputLabel>{t("semester.form.period")}</InputLabel>
                        <Select
                          label={t("semester.form.period")}
                          value={time.period}
                          disabled={isDetail}
                          sx={{ width: 220, mr: 2 }}
                          onChange={(event: any) => {
                            handleChangeSubjectTimeField(
                              index,
                              timeIndex,
                              event.target.value,
                              "period"
                            );
                          }}
                          variant="outlined"
                          error={
                            errors.listSubject &&
                            errors.listSubject[index] &&
                            errors.listSubject[index].listSubjectTime &&
                            errors.listSubject[index].listSubjectTime[
                              timeIndex
                            ] &&
                            errors.listSubject[index].listSubjectTime[timeIndex]
                              .period
                          }
                        >
                          {periodOptions.map((option, index) => (
                            <MenuItem
                              key={index.toString()}
                              value={option.value}
                            >
                              {t(option.label)}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.listSubject &&
                          errors.listSubject[index] &&
                          errors.listSubject[index].listSubjectTime &&
                          errors.listSubject[index].listSubjectTime[
                            timeIndex
                          ] &&
                          errors.listSubject[index].listSubjectTime[timeIndex]
                            .period && (
                            <FormHelperText error id="accountId-error">
                              {errors.classroom}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </FormikProvider>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          type="submit"
          disabled={isDetail}
          onClick={() => handleSubmit()}
        >
          {t("profile.action.save")}
        </Button>
      </CardActions>
    </Card>
  );
}
