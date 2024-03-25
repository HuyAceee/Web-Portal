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
import CustomTextarea from "components/CustomTextarea";
import { fieldRequired } from "constant/validation";
import { LoadingContext } from "contexts/LoadingContext";
import { useFormik } from "formik";
import type { QuestionModel } from "models/view/question";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { QuestionService } from "services/question";
import * as Yup from "yup";

export default function ContactAdminForm(): JSX.Element {
  const { t } = useTranslation();
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik<QuestionModel>({
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      question: "",
    },
    validationSchema: Yup.object({
      question: Yup.string().required(t(fieldRequired)),
    }),
    onSubmit: async (value, { resetForm }) => {
      try {
        openLoading();
        await QuestionService.create(value);
        enqueueSnackbar(t("notification.title.success"), {
          variant: "success",
        });
        resetForm();
      } catch (error) {
        enqueueSnackbar(t("notification.title.fail"), {
          variant: "error",
        });
      } finally {
        closeLoading();
      }
    },
  });

  const { errors, handleChange, values, handleSubmit, touched } = formik;

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader
        subheader={t("contactAdmin.subheader")}
        title={t("contactAdmin.title")}
      />
      <Divider />
      <CardContent>
        <Grid container padding={3} spacing={3} mt={1} mb={1}>
          <InputLabel required sx={{ marginBottom: 2 }}>
            {t("contactAdmin.form.question")}
          </InputLabel>
          <FormControl fullWidth required>
            <CustomTextarea
              name="question"
              value={values.question}
              onChange={handleChange}
            />
            {!!errors.question && touched.question && (
              <FormHelperText error id="accountId-error">
                {errors.question}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          type="submit"
          onClick={() => handleSubmit()}
        >
          {t("action.send")}
        </Button>
      </CardActions>
    </Card>
  );
}
