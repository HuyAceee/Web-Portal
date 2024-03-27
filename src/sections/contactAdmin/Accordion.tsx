import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { fieldRequired } from "constant/validation";
import { AuthContext } from "contexts/AuthContext";
import { LoadingContext } from "contexts/LoadingContext";
import { useFormik } from "formik";
import type { QuestionModel } from "models/view/question";
import { useSnackbar } from "notistack";
import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { QuestionService } from "services/question";
import { convertObjectWithDefaults, isAdmin } from "utils/common";
import * as Yup from "yup";

interface AccordionComponentProps {
  data: QuestionModel;
  expanded?: boolean;
  onChange:
    | ((event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void)
    | undefined;
  fetchData: () => Promise<void>;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>
}

const AccordionComponent = ({
  data,
  expanded,
  onChange,
  fetchData,
  setExpanded
}: AccordionComponentProps) => {
  const { t } = useTranslation();
  const { userInfo } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const formik = useFormik<QuestionModel>({
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: convertObjectWithDefaults<QuestionModel>(data),
    validationSchema: Yup.object({
      answer: Yup.string().required(t(fieldRequired)),
    }),
    onSubmit: async (value) => {
      try {
        openLoading();
        await QuestionService.answer(value);
        setExpanded(false)
        await fetchData()
        enqueueSnackbar(t("notification.title.success"), {
          variant: "success",
        });
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
    <Accordion
      expanded={expanded}
      onChange={onChange}
      slotProps={{ transition: { unmountOnExit: true } }}
      sx={{ width: "100%" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ flexShrink: 0, marginRight: 5 }}>
          {data.question}
        </Typography>
        {data.answer && <CheckIcon color="success" />}
      </AccordionSummary>
      <AccordionDetails>
        {!isAdmin(userInfo.role) || data.answer ? (
          <Typography>{data.answer}</Typography>
        ) : (
          <Fragment>
            <Stack spacing={1}>
              <TextField
                name="answer"
                label="Answer"
                value={values.answer}
                onChange={handleChange}
                error={!!errors.answer && touched.answer}
              />
              {!!errors.answer && touched.answer && (
                <FormHelperText error id="accountId-error">
                  {errors.answer}
                </FormHelperText>
              )}
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={() => handleSubmit()}
              >
                {t("action.send")}
              </LoadingButton>
            </Stack>
          </Fragment>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;
