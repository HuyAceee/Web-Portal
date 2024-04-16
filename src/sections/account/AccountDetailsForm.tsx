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
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { ROLE } from "constant/key";
import { phoneNumberRegex } from "constant/regex";
import { NEW_USER, PROFILE_PAGE, USER_PAGE } from "constant/router";
import {
  fieldEmail,
  fieldPhoneNumber,
  fieldRequired,
} from "constant/validation";
import dayjs from "dayjs";
import { useFormik } from "formik";
import type { ClassroomModel } from "models/view/classroom";
import type { UserInformationModel } from "models/view/user";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "routes/hooks";
import { AuthService } from "services/auth";
import { ClassroomService } from "services/classroom";
import { UploadService } from "services/upload";
import { UserService } from "services/user";
import { convertObjectWithDefaults, isAdmin } from "utils/common";
import { convertDate } from "utils/formatTime";
import { handleLocalStorage } from "utils/localStorage";
import * as Yup from "yup";

interface AccountDetailsFormProps {
  selectedFile: any;
  defaultData?: UserInformationModel;
}

const genders = [
  { value: 0, label: "profile.options.gender.male" },
  { value: 1, label: "profile.options.gender.female" },
];

export function AccountDetailsForm({
  selectedFile,
  defaultData = {} as UserInformationModel,
}: AccountDetailsFormProps): React.JSX.Element {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { getLocalStorage } = handleLocalStorage();
  const router = useRouter();
  const [classroom, setClassroom] = React.useState<ClassroomModel[]>([]);

  const isAdminAccount = React.useMemo(() => {
    return isAdmin(getLocalStorage(ROLE));
  }, [getLocalStorage(ROLE)]);
  const getClassroom = async () => {
    try {
      const data = await ClassroomService.getList();
      setClassroom(data);
    } catch (error) {
      console.log(error);
    }
  };

  const classroomOptions = React.useMemo(() => {
    return classroom.map((i) => ({ value: i.id, label: i.name }));
  }, [classroom]);

  const validationSchema = Yup.object({
    name: Yup.string().required(t(fieldRequired)),
    email: Yup.string().required(t(fieldRequired)).email(t(fieldEmail)),
    isFemale: Yup.number().required(t(fieldRequired)),
    phoneNumber: Yup.string()
      .required(t(fieldRequired))
      .matches(phoneNumberRegex, t(fieldPhoneNumber)),
    ...(!isAdminAccount ? { classroomId: Yup.string().required() } : {}),
  });
  const formik = useFormik<UserInformationModel>({
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: convertObjectWithDefaults<UserInformationModel>({
      ...defaultData,
      isFemale: defaultData?.isFemale ? 1 : 0,
      birthDate: new Date(convertDate(defaultData?.birthDate as string ?? '')).valueOf()
    }),
    validationSchema,
    onSubmit: async (value) => {
      try {
        let imageUrl = undefined;
        if (selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile);
          const { data } = await UploadService.upload(formData);
          imageUrl = data;
        }
        const payload = {
          ...value,
          classroom: value.classroomId,
          imageUrl: imageUrl ?? defaultData?.imageUrl,
          isFemale: !value.isFemale,
          birthDate: value.birthDate || dayjs().valueOf()
        }
        if (pathname === PROFILE_PAGE) {
          await AuthService.updateUserInfo(payload);
        } else if (pathname === NEW_USER) {
          await AuthService.register(payload);
        } else {
          await UserService.updateUserInfo(payload)
        }
        enqueueSnackbar(t("notification.title.success"), {
          variant: "success",
        });
        if (pathname !== PROFILE_PAGE) {
          router.push(USER_PAGE);
        }
      } catch (error) {
        enqueueSnackbar(t("notification.title.fail"), {
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

  const showClassroomField = React.useMemo(() => {
    if (pathname === PROFILE_PAGE && isAdminAccount) return false;
    return true;
  }, [pathname, isAdminAccount]);

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
          {showClassroomField && (
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>{t("profile.form.class")}</InputLabel>
                <Select
                  label="Classroom"
                  name="classroomId"
                  value={values.classroomId}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={pathname === PROFILE_PAGE}
                  error={!!errors.classroomId && touched.classroomId}
                >
                  {classroomOptions.map((option, index) => (
                    <MenuItem key={index.toString()} value={option.value}>
                      {option.label}
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
                    {t(option.label)}
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
          <Grid md={6} xs={12} pt={0.5}>
            <FormControl fullWidth required>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label={t("profile.form.birthday")}
                    name="birthDate"
                    sx={{
                      width: '100%'
                    }}
                    selectedSections="all"
                    format="DD/MM/YYYY"
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
