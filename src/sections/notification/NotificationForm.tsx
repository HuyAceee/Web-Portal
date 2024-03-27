"use client";

import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CustomTextarea from "components/CustomTextarea";
import { NOTIFICATION_PAGE } from "constant/router";
import { fieldRequired } from "constant/validation";
import dayjs from "dayjs";
import { useFormik } from "formik";
import type { NotificationModel } from "models/view/notification";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "routes/hooks";
import { NotificationService } from "services/notification";
import { UploadService } from "services/upload";
import { convertObjectWithDefaults } from "utils/common";
import { formatDate_YYYY_MM_DD } from "utils/formatTime";
import * as Yup from "yup";

interface NotificationFormProps {
  selectedFile: any;
}

export function NotificationForm({
  selectedFile,
}: NotificationFormProps): React.JSX.Element {
  const { t } = useTranslation();
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object({
    title: Yup.string().required(t(fieldRequired)),
    description: Yup.string().required(t(fieldRequired)),
    startDate: Yup.string().required(t(fieldRequired)),
    endDate: Yup.string().required(t(fieldRequired)),
  });

  const formik = useFormik<NotificationModel>({
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: convertObjectWithDefaults<NotificationModel>({
      title: "",
      description: "",
      startDate: formatDate_YYYY_MM_DD(),
      endDate: formatDate_YYYY_MM_DD(),
    } as NotificationModel),
    validationSchema,
    onSubmit: async (value) => {
      try {
        if (!selectedFile) {
          enqueueSnackbar(t("notification.title.pleaseChooseImage"), {
            variant: "error",
          });
          return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        const { data: imageUrl } = await UploadService.upload(formData);
        await NotificationService.create({ ...value, imageUrl });
        enqueueSnackbar(t("notification.title.createSuccess"), {
          variant: "success",
        });
        router.push(NOTIFICATION_PAGE)
      } catch (error) {
        enqueueSnackbar(t("notification.title.createFail"), {
          variant: "error",
        });
      }
    },
  });

  const { errors, handleChange, values, handleSubmit, touched, setFieldValue } =
    formik;

  return (
    <Card>
      <CardHeader
        subheader={t("blog.info.subheader")}
        title={t("blog.info.title")}
      />
      <Divider />
      <CardContent>
        <Grid container padding={3} spacing={3}>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label={t("blog.form.startDate")}
                    name="startDate"
                    selectedSections="all"
                    value={dayjs(values.startDate)}
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
                    selectedSections="all"
                    value={dayjs(values.endDate)}
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
            <InputLabel required sx={{ marginBottom: 1 }}>
              {t("blog.form.title")}
            </InputLabel>
            <FormControl fullWidth required>
              <CustomTextarea
                name="title"
                value={values.title}
                onChange={handleChange}
                notResize
              />
              {!!errors.title && touched.title && (
                <FormHelperText error id="accountId-error">
                  {errors.title}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid md={12} xs={12}>
            <InputLabel required sx={{ marginBottom: 1 }}>
              {t("blog.form.description")}
            </InputLabel>
            <FormControl fullWidth required>
              <CustomTextarea
                name="description"
                value={values.description}
                onChange={handleChange}
                notResize
              />
              {!!errors.description && touched.description && (
                <FormHelperText error id="accountId-error">
                  {errors.description}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          type="submit"
          onClick={() => handleSubmit()}
        >
          {t("action.create")}
        </Button>
      </CardActions>
    </Card>
  );
}
