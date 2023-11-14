import { Button, Grid, Link } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useForm, Form } from "../../hooks/useForm";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import validate from "../fields/field validation/validate";
import FieldsControl from "../fields/FieldsControl";
import { sweetAlertButtonSaveUser } from "../../sweetAlert2/SweetAlert";
import { saveSession } from "../../services/session/SessionService";
import { useStyles } from "./Styles/signupStyle";
import { useTheme } from "@mui/material/styles";

const initialStateFields = {
  fullNames: "Manuel",
  fullSurNames: "Sanchez",
  documentType: "Citizenship Card",
  idNumber: "1090510816",
  phoneNumber: "3104622813",
  role: "student",
  teachersPassword: "",
  email: "manuel231509@gmail.com",
  password: "2315409",
};

const SignupForm = () => {
  const classes = useStyles();
  const theme = useTheme();
  const sDeepOrange = theme.palette.secondary;

  const validateFields = (fieldsValues = fields) => {
    const tempErrors = { ...errors };

    validate(fieldsValues, tempErrors, fields);

    setErrors({ ...tempErrors });

    if (fieldsValues === fields)
      return Object.values(tempErrors).every((v) => v === "");
  };
  const { fields, handleChangeFields, errors, setErrors, resetFields } =
    useForm(initialStateFields, true, validateFields);

  const { loading, callEndPoint } = useFetchAndLoad();

  const getApi = async (ssession) => await callEndPoint(saveSession(ssession));

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("fields:  ", fields, "errors: ", errors);
    if (validateFields()) {
      sweetAlertButtonSaveUser(fields, resetFields, getApi);
    }
  };

  return (
    <Form onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FieldsControl.FieldFullNames
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            otherTextFieldProps={{
              variant: "filled",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldsControl.FieldFullSurNames
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            otherTextFieldProps={{
              variant: "filled",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldsControl.FieldDocumentType
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldsControl.FieldIdNumber
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            otherTextFieldProps={{
              variant: "filled",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldsControl.FieldPhoneNumber
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            otherTextFieldProps={{
              variant: "filled",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldsControl.FieldEmail
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            otherTextFieldProps={{
              variant: "filled",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldsControl.FieldPassword
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
            typeInput="FilledInput"
          />
        </Grid>
        <Grid item xs={12}>
          <FieldsControl.FieldRole
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
          />
        </Grid>
        {fields.role === "teacher" && (
          <Grid item xs={12}>
            <FieldsControl.FieldTeachersPassword
              fields={fields}
              handleChangeFields={handleChangeFields}
              errors={errors}
              typeInput="FilledInput"
            />
          </Grid>
        )}
      </Grid>
      <Button
        className={classes.submitBtn}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1.4 }}
      >
        Sign Up
      </Button>
      {loading && <p>Loading...</p>}
      <Grid container mb={2.7} justifyContent="flex-end">
        <Grid item>
          <Link
            color="gray"
            underline="hover"
            sx={{
              "&:hover": {
                color: sDeepOrange["light"],
              },
            }}
          >
            <NavLink
              to="/login"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Already have an account? Sign In
            </NavLink>
          </Link>
        </Grid>
      </Grid>
    </Form>
  );
};

export default SignupForm;
