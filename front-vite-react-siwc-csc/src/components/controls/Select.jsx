import { Error as ErrorIcon } from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { lazy } from "react";
import {
  SuspenseProgressSkeleton
} from "../SuspenseProgress/SusProg";

const FormControlStyled = lazy(() =>
  import("./Styled/ControlStyled").then((module) => ({
    default: module.FormControlStyled,
  }))
);
const FormHelperTextStyled = lazy(() =>
  import("./Styled/ControlStyled").then((module) => ({
    default: module.FormHelperTextStyled,
  }))
);

const Select = (props) => {
  const {
    formControlProps,
    error = null,
    inputLabelProps,
    selectProps,
    names,
    formHelperTextProps,
    menuItemProps = null,
    menuItemsValues,
  } = props;
  return (
    <>
      <FormControlStyled {...(error && { error: true })} {...formControlProps}>
        <InputLabel variant="filled" {...inputLabelProps}>
          {inputLabelProps.label}
        </InputLabel>
        <MuiSelect variant="filled" {...selectProps}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {names.map((name, index) => (
            <MenuItem
              key={`select-${name[menuItemsValues.nameFieldId]}${index}`}
              value={name[menuItemsValues.nameFieldId]}
              {...menuItemProps}
            >
              {name[menuItemsValues.nameFieldValue]}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControlStyled>
      {error && (
        <SuspenseProgressSkeleton
          skeletonProps={{
            variant: "rectangular",
            animation: "wave",
            sx: { minWidth: "100%" },
          }}
        >
          <FormHelperTextStyled
            {...(error && { error: true })}
            {...formHelperTextProps}
          >
            <ErrorIcon
              fontSize="small"
              sx={{
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            />
            {error}
          </FormHelperTextStyled>
        </SuspenseProgressSkeleton>
      )}
    </>
  );
};

const SelectCheckMark = (props) => {
  const {
    formControlProps,
    error = null,
    inputLabelProps,
    selectProps,
    names,
    formHelperTextProps,
    menuItemProps = null,
  } = props;

  return (
    <>
      <FormControlStyled {...(error && { error: true })} {...formControlProps}>
        <InputLabel variant="filled" {...inputLabelProps}>
          {inputLabelProps.label}
        </InputLabel>
        <MuiSelect variant="filled" {...selectProps}>
          <MenuItem
            key={"all_students"}
            value={
              selectProps.value.length === names.length
                ? "uncheck_all_items"
                : "check_all_items"
            }
            {...menuItemProps}
          >
            <Checkbox checked={selectProps.value.length === names.length} />
            <Grid container alignItems="center" columnGap={2}>
              <Avatar
                src="/static/images/avatar/1.jpg"
                sx={{ width: 35, height: 35, fontSize: 15 }}
              />
              <ListItemText>ALL STUDENTS</ListItemText>
            </Grid>
          </MenuItem>
          {names.map((name, index) => {
            return (
              <MenuItem key={index} value={name} /* {...menuItemProps} */>
                <Checkbox
                  checked={selectProps?.value?.some(
                    (n) => name.idNumberStudent === n?.idNumberStudent
                  )}
                />
                <Grid container alignItems="center" columnGap={2}>
                  <Avatar
                    alt={name.fullNamesStudent}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 35, height: 35, fontSize: 15 }}
                  />
                  <ListItemText>
                    {name.fullNamesStudent} {name.fullSurNamesStudent}
                  </ListItemText>
                </Grid>
              </MenuItem>
            );
          })}
        </MuiSelect>
      </FormControlStyled>
      {error && (
        <SuspenseProgressSkeleton
          skeletonProps={{
            variant: "rectangular",
            animation: "wave",
            sx: { minWidth: "100%" },
          }}
        >
          <FormHelperTextStyled
            {...(error && { error: true })}
            {...formHelperTextProps}
          >
            <ErrorIcon
              fontSize="small"
              sx={{
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            />
            {error}
          </FormHelperTextStyled>
        </SuspenseProgressSkeleton>
      )}
    </>
  );
};

export { Select, SelectCheckMark };

