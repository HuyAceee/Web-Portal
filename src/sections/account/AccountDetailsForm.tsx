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
import { useTranslation } from 'react-i18next';
import { fieldEmail, fieldPhoneNumber, fieldRequired } from "constant/validation";

interface ProfileModel {
  name: string;
  email: string;
  class: string;
  gender: string;
  birthday: string;
  phoneNumber: string;
}

export function AccountDetailsForm(): React.JSX.Element {
  const { t } = useTranslation()

  const genders = [
    { value: "male", label: t("profile.options.gender.male") },
    { value: "female", label: t("profile.options.gender.female") }
  ];

  const formik = useFormik<ProfileModel>({
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      class: "",
      gender: genders[0].value,
      birthday: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t(fieldRequired)),
      email: Yup.string().required().email(t(fieldEmail)),
      class: Yup.string().required(),
      gender: Yup.string().required(),
      birthday: Yup.string().required(),
      phoneNumber: Yup.string().required().matches(phoneNumberRegex, t(fieldPhoneNumber)),
    }),
    onSubmit: async (value, { resetForm }) => {
      console.log(value);
      resetForm()
    },
  });

  const { errors, handleChange, values, handleSubmit, touched } = formik;
  return (
    <Card>
      <CardHeader subheader={t('profile.content.subheader')} title={t('profile.content.title')} />
      <Divider />
      <CardContent>
        <Grid container padding={3} spacing={3}>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>{t('profile.form.accountName')}</InputLabel>
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
              <InputLabel>{t('profile.form.emailAddress')}</InputLabel>
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
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>{t('profile.form.class')}</InputLabel>
              <OutlinedInput
                label="Class"
                name="class"
                value={values.class}
                onChange={handleChange}
                error={!!errors.class && touched.class}
              />
              {!!errors.class && touched.class && (
                <FormHelperText error id="accountId-error">
                  {errors.class}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>{t('profile.form.gender')}</InputLabel>
              <Select
                label="State"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.gender && touched.gender}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.gender && touched.gender && (
                <FormHelperText error id="accountId-error">
                  {errors.gender}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>{t('profile.form.birthday')}</InputLabel>
              <OutlinedInput
                label="Birthday"
                name="birthday"
                value={values.birthday}
                onChange={handleChange}
                error={!!errors.birthday && touched.birthday}
              />
              {!!errors.birthday && touched.birthday && (
                <FormHelperText error id="accountId-error">
                  {errors.birthday}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>{t('profile.form.phoneNumber')}</InputLabel>
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
          {t('profile.action.save')}
        </Button>
      </CardActions>
    </Card>
  );
}
