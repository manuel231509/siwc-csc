import { createFilterOptions } from "@mui/material";
import React from "react";
import Controls from "../controls/Controls";
import { useState } from "react";

const filter = createFilterOptions();

const sleep = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

const FieldAchievements = (props) => {
  const {
    fields,
    handleChangeFieldAutoComplete,
    errors,
    nameField,
    otherTextFieldProps,
    otherAutoCompleteProps,
  } = props;
  let { listAchievements } = props;

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        const listAch = listAchievements.map((achievement) => ({
          description: achievement.description,
        }));
        setOptions([...listAch]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <Controls.AutoComplete
      autoCompleteProps={{
        id: `free-solo-dialog-${nameField}`,
        open: open,
        onOpen: () => {
          setOpen(true);
        },
        onClose: () => {
          setOpen(false);
        },
        isOptionEqualToValue: (option, value) =>
          option.description === value.description,
        getOptionLabel: (option) => option.description,
        options: options,
        loading: loading,
        onChange: (event, newValue) => {
          if (newValue && newValue.inputValue) {
            handleChangeFieldAutoComplete(nameField, {
              description: newValue && newValue.inputValue,
            });
          } else {
            console.log("ninguna de las anteriores: ", newValue);
            handleChangeFieldAutoComplete(nameField, newValue);
          }
        },
        selectOnFocus: true,
        clearOnBlur: true,
        handleHomeEndKeys: true,
        ...otherAutoCompleteProps,
      }}
      controlsInputProps={{
        textFieldProps: {
          value: fields[nameField],
          variant: "filled",
          id: nameField,
          name: nameField,
          fullWidth: true,
          "aria-describedby": "component-error-text",
          InputLabelProps: {
            sx: {
              fontSize: { xs: 12, sm: 14, md: 16 },
            },
          },
          InputProps: {
            sx: {
              fontSize: { xs: 12, sm: 14, md: 16 },
            },
          },
          ...otherTextFieldProps,
        },
        formHelperTextProps: {
          id: "component-error-text",
          sx: {
            display: "flex",
            alignItems: "center",
            textAlign: "justify",
          },
        },
        error: errors[nameField],
      }}
      loading={loading}
    />
  );
};
export default FieldAchievements;
