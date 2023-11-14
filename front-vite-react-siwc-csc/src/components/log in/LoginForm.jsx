import { LoadingButton } from "@mui/lab";
import { Avatar, CircularProgress, Grid, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import shield_csc from "../../assets/images/shield_csc.png";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { Form, useForm } from "../../hooks/useForm";
import { resetSession } from "../../redux/states/ssessionSlice";
import { loginSession } from "../../services/session/SessionService";
import { sweetAlertButtonLoginSession } from "../../sweetAlert2/SweetAlert";
import FieldsControl from "../fields/FieldsControl";
import validate from "../fields/field validation/validate";
import { useStyles } from "./Styles/loginStyle";
import {
  AvatarStyled,
  FormStyled,
  GridPaperStyled,
  LoadingButtonStyled,
} from "./Styled/LoginStyled";

const initialStateFields = {
  email: "",
  password: "",
  role: "",
};
const LoginForm = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const getApi = async (ssession) => await callEndPoint(loginSession(ssession));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateFields()) {
      sweetAlertButtonLoginSession(
        theme,
        fields,
        resetFields,
        getApi,
        dispatch,
        navigate
      );
    }
  };

  useEffect(() => {
    dispatch(resetSession());
  }, []);

  return (
    <GridPaperStyled>
      <AvatarStyled
        variant="outlined"
        src={shield_csc}
        sx={{
          width: 200,
          height: 200,
        }}
      />

      <FormStyled onSubmit={handleSubmit}>
        <FieldsControl.FieldEmail
          fields={fields}
          handleChangeFields={handleChangeFields}
          errors={errors}
          otherTextFieldProps={{
            margin: "normal",
            variant: "filled",
            autoFocus: true,
          }}
        />
        <FieldsControl.FieldPassword
          fields={fields}
          handleChangeFields={handleChangeFields}
          errors={errors}
          typeInput="FilledInput"
          otherFormControlProps={{
            margin: "normal",
          }}
        />
        <Grid item xs={12}>
          <FieldsControl.FieldRole
            fields={fields}
            handleChangeFields={handleChangeFields}
            errors={errors}
          />
        </Grid>

        <LoadingButtonStyled
          type="submit"
          fullWidth
          loading={loading}
          loadingIndicator={
            <CircularProgress
              sx={{
                color: theme.palette.secondary["contrastTextMain"],
              }}
              size={20}
              disableShrink
            />
          }
          sx={{
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(1.5),
          }}
          disabled={loading ? true : false}
        >
          Sign In
        </LoadingButtonStyled>
        {loading && "LOADING"}
        {/* <Grid container mb={2}>
          <Grid item xs container justifyContent={"center"}>
            <Link
              color="gray"
              underline="hover"
              sx={{
                "&:hover": {
                  color: sDeepOrange["light"],
                },
              }}
              component={NavLink}
              to={"/login/forgot-password"}
            >
              Forgot password?
            </Link>
          </Grid>
        </Grid> */}
      </FormStyled>
    </GridPaperStyled>
  );
};

export default LoginForm;
