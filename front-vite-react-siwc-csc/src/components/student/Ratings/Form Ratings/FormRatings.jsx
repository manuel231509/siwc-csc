import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useStudentContext } from "../../../../context/Student/StudentProvider";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad3";
import { useForm } from "../../../../hooks/useForm";
import {
  getAllPeriods,
  getAllPeriodsSort,
  getPeriodByDateNowSystem,
} from "../../../../services/period/PeriodService";
import FieldsControl from "../../../fields/FieldsControl";
import validate from "../../../fields/field validation/validate";
import { FormStyled } from "./Styled/FormRaitingStyled";
import {
  getObjectLocalStorage,
  saveLocalStorage,
} from "../../../../LocalStorage/LocalStorage";
import { encryptedText } from "../../../../CryptoJs/CryptoJs";

const initialStateFields = {
  periods: "",
};

const FormRatings = () => {
  const {
    periods,
    handleChangePeriods,
    handleChangeLoading,
    handleChangeSelect,
  } = useStudentContext();

  const { loading, callEndPoint } = useFetchAndLoad(handleChangeLoading);

  const [fieldValidate, setFieldValidate] = useState(false);

  const validateFields = (fieldValues = fields, nameField) => {
    const tempErrors = { ...errors };

    validate(fieldValues, tempErrors, fields);

    setErrors({ ...tempErrors });

    const fieldValid = Object.values(tempErrors).every((v) => v === "");

    setFieldValidate(!fieldValid);

    if (fieldValues === fields) return fieldValid;
  };

  const { fields, handleChangeFields, handleChangeFields1, errors, setErrors } =
    useForm(initialStateFields, true, validateFields);

  const handleClickFields = (nameFields) => (e) => {
    e.preventDefault();
    if (validateFields()) {
      const value = e.target.dataset.value;
      handleChangeSelect(nameFields, value);
    }
  };

  const getApiAllPeriods = async (arrayOrdre, jwt, bearer) =>
    await callEndPoint(
      getAllPeriodsSort(arrayOrdre, jwt, bearer),
      "periods",
      "periods"
    );

  const getApiPeriodByDateNowSystem = async (jwt, bearer) =>
    await callEndPoint(
      getPeriodByDateNowSystem(jwt, bearer),
      "periodbydatenow",
      "periodbydatenow"
    );

  const { jwt, bearer } = useSelector((store) => store.ssession);

  useEffect(() => {
    console.log(jwt, bearer);
    const fetchData = async () => {
      const arrayOrdre = ["initialDate", "finalDate"];
      const { data: allPeriods } = await getApiAllPeriods(
        arrayOrdre,
        jwt,
        bearer
      );
      const { data: currentPeriod } = await getApiPeriodByDateNowSystem(
        jwt,
        bearer
      );
      const filterAllPeriods = allPeriods.filter(
        (period) => period.finalDate <= currentPeriod.finalDate
      );
      const selectFormGrades = getObjectLocalStorage("formgrades");
      handleChangePeriods("data", filterAllPeriods);
      saveLocalStorage("formgrades", {
        ...selectFormGrades,
        ["periods"]: encryptedText(currentPeriod.idPeriod),
      });
      handleChangeFields1("periods", currentPeriod.idPeriod);
      handleChangeSelect("periods", currentPeriod.idPeriod);
    };
    fetchData();
  }, []);

  return (
    <Grid container mb={2} justifyContent="center" alignContent="center">
      <FormStyled>
        <FieldsControl.FieldPeriod
          fields={fields}
          handleChangeFields={handleChangeFields}
          errors={errors}
          handleClickFields={handleClickFields}
          listPeriods={periods.data}
        />
      </FormStyled>
    </Grid>
  );
};

export default FormRatings;
