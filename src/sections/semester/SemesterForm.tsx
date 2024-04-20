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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
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
import { convertDate } from "utils/formatTime";
import * as Yup from "yup";

const typeOptions = [
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
    initialValues: defaultData ? ({
      ...defaultData,
      startDate: new Date(
        convertDate((defaultData?.startDate as string) ?? '')
      ).valueOf(),
      endDate: new Date(
        convertDate((defaultData?.endDate as string) ?? "")
      ).valueOf(),
    } as SemesterFormModel) : {
      classroomId: undefined,
      startDate: convertDate(),
      endDate: convertDate(),
      listSubject: [],
    },
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
              week: Yup.number().required(t(fieldRequired)),
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
                        [key]:
                          key === "type" || key === "week"
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label={t("blog.form.startDate")}
                      name="startDate"
                      disabled={isDetail}
                      selectedSections="all"
                      format="DD/MM/YYYY"
                      value={dayjs(values?.startDate)}
                      onChange={(value: any) => {
                        setFieldValue("startDate", Date.parse(value));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {!!errors.startDate && touched.startDate && (
                  <FormHelperText error id="accountId-error">
                    {errors.startDate}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label={t("blog.form.endDate")}
                      name="endDate"
                      disabled={isDetail}
                      selectedSections="all"
                      format="DD/MM/YYYY"
                      value={dayjs(values?.endDate)}
                      onChange={(value: any) => {
                        setFieldValue("endDate", Date.parse(value));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {!!errors.endDate && touched.endDate && (
                  <FormHelperText error id="accountId-error">
                    {errors.endDate}
                  </FormHelperText>
                )}
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
                                {} as SubjectTimeModel,
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
                      <TextField
                        label={t("semester.form.week")}
                        value={time.week}
                        disabled={isDetail}
                        onChange={(event: any) => {
                          handleChangeSubjectTimeField(
                            index,
                            timeIndex,
                            event.target.value,
                            "week"
                          );
                        }}
                        type="number"
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
                        helperText={
                          errors.listSubject &&
                          errors.listSubject[index] &&
                          errors.listSubject[index].listSubjectTime &&
                          errors.listSubject[index].listSubjectTime[
                            timeIndex
                          ] &&
                          errors.listSubject[index].listSubjectTime[timeIndex]
                            .week
                        }
                      />
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
