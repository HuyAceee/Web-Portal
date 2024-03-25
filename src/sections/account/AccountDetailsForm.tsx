"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import { phoneNumberRegex } from "constant/regex";
import { useTranslation } from "react-i18next";
import {
  fieldEmail,
  fieldPhoneNumber,
  fieldRequired,
} from "constant/validation";
import { AuthContext } from "contexts/AuthContext";
import type { UserInformationModel } from "models/view/user";
import { convertObjectWithDefaults, isAdmin } from "utils/common";
import { AuthService } from "services/auth";
import { useSnackbar } from "notistack";
import { ClassroomService } from "services/classroom";
import type { ClassroomModel } from "models/view/classroom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { UploadService } from "services/upload";

interface AccountDetailsFormProps {
  selectedFile: any
}

export function AccountDetailsForm({ selectedFile }: AccountDetailsFormProps): React.JSX.Element {
  const { userInfo } = React.useContext(AuthContext);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [classroom, setClassroom] = React.useState<ClassroomModel[]>([]);
  const getClassroom = async () => {
    try {
      const data = await ClassroomService.getList();
      setClassroom(data);
    } catch (error) {
      console.log(error);
    }
  };

  const genders = [
    { value: 0, label: t("profile.options.gender.male") },
    { value: 1, label: t("profile.options.gender.female") },
  ];

  const classroomOptions = React.useMemo(() => {
    return classroom.map((i) => ({ value: i.id, label: i.name }));
  }, [classroom]);

  const validationSchema = Yup.object({
    name: Yup.string().required(t(fieldRequired)),
    email: Yup.string().required(t(fieldRequired)).email(t(fieldEmail)),
    isFemale: Yup.number().required(t(fieldRequired)),
    birthDate: Yup.string().required(t(fieldRequired)),
    phoneNumber: Yup.string()
      .required(t(fieldRequired))
      .matches(phoneNumberRegex, t(fieldPhoneNumber)),
    ...(!isAdmin(userInfo.role)
      ? { classroom: Yup.string().required() }
      : {}),
  });

  const formik = useFormik<UserInformationModel>({
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: convertObjectWithDefaults<UserInformationModel>({
      ...userInfo,
      isFemale: userInfo.isFemale ? 1 : 0,
    }),
    validationSchema,
    onSubmit: async (value) => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const { data: imageUrl } = await UploadService.upload(formData);
        await AuthService.updateUserInfo({ ...value, imageUrl });
        enqueueSnackbar(t("notification.title.updateProfileSuccess"), {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar(t("notification.title.updateProfileFail"), {
          variant: "error",
        });
      }
    },
  });

  const { errors, handleChange, values, handleSubmit, touched, setFieldValue } =
    formik;

  React.useEffect(() => {
    getClassroom();
  }, []);

  return (
    <Card>
      <CardHeader
        subheader={t("profile.content.subheader")}
        title={t("profile.content.title")}
      />
      <Divider />
      <CardContent>
        <Grid container padding={3} spacing={3}>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>{t("profile.form.accountName")}</InputLabel>
              <OutlinedInput
                label="Account name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={!!errors.name && touched.name}
              />
              {!!errors.name && touched.name && (
                <FormHelperText error id="accountId-error">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>{t("profile.form.emailAddress")}</InputLabel>
              <OutlinedInput
                label="Email address"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email && touched.email}
              />
              {!!errors.email && touched.email && (
                <FormHelperText error id="accountId-error">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {!isAdmin && (
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>{t("profile.form.class")}</InputLabel>
                <Select
                  label="Classroom"
                  name="classroom"
                  value={values.classroom}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!errors.classroom && touched.classroom}
                >
                  {classroomOptions.map((option, index) => (
                    <MenuItem key={index.toString()} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.classroom && touched.classroom && (
                  <FormHelperText error id="accountId-error">
                    {errors.classroom}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          )}

          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>{t("profile.form.gender")}</InputLabel>
              <Select
                label="State"
                name="isFemale"
                value={values.isFemale}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.isFemale && touched.isFemale}
              >
                {genders.map((option, index) => (
                  <MenuItem key={index.toString()} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.isFemale && touched.isFemale && (
                <FormHelperText error id="accountId-error">
                  {errors.isFemale}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Birthday"
                    name="birthDate"
                    selectedSections="all"
                    value={dayjs(values.birthDate)}
                    onChange={(value: any) => {
                      setFieldValue("birthDate", Date.parse(value));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {!!errors.birthDate && touched.birthDate && (
                <FormHelperText error id="accountId-error">
                  {errors.birthDate}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>{t("profile.form.phoneNumber")}</InputLabel>
              <OutlinedInput
                label="Phone number"
                type="number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber && touched.phoneNumber}
              />
              {!!errors.phoneNumber && touched.phoneNumber && (
                <FormHelperText error id="accountId-error">
                  {errors.phoneNumber}
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
          {t("profile.action.save")}
        </Button>
      </CardActions>
    </Card>
  );
}
