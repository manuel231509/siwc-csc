import Controls from "../controls/Controls";
import {
  createFilterOptions,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const filter = createFilterOptions();

const FieldPlan = (props) => {
  const { fields, handleChangeFieldAutoComplete, errors } = props;
  let { listPlan } = props;
  return (
    <Controls.AutoComplete
      autoCompleteProps={{
        value: fields.plan,
        onChange: (event, newValue) => {
          if (newValue && newValue.inputValue) {
            handleChangeFieldAutoComplete("plan", {
              planName: newValue && newValue.inputValue,
            });
          } else {
            console.log("ninguna de las anteriores: ", newValue);
            handleChangeFieldAutoComplete("plan", newValue);
          }
        },
        filterOptions: (options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== "" && filtered <= 0) {
            filtered.push({
              inputValue: params.inputValue,
              planName: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        },
        id: "free-solo-dialog-plan",
        options: listPlan.map((periodPlan) => {
          return { planName: periodPlan.planName };
        }),
        getOptionLabel: (option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.planName;
        },
        selectOnFocus: true,
        clearOnBlur: true,
        handleHomeEndKeys: true,
        renderOption: (props, option) => {
          return (
            <MenuItem {...props}>
              <ListItemText>{option.planName}</ListItemText>
              <ListItemIcon
                onClick={(e) => {
                  e.preventDefault();
                  console.log("option.planName: ", option.planName);

                  listPlan = listPlan.filter((plan) => {
                    console.log("plan.planName:  ", plan.planName);
                    return plan.planName !== option.planName;
                  });
                  console.log("listPlan: ", listPlan);
                }}
              >
                <DeleteIcon />
              </ListItemIcon>
            </MenuItem>
          );
        },
        freeSolo: true,
      }}
      controlsInputProps={{
        textFieldProps: {
          variant: "filled",
          id: "plan",
          name: "plan",
          fullWidth: true,
          required: true,
          label: "Plan",
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
        },
        formHelperTextProps: {
          id: "component-error-text",
          sx: {
            display: "flex",
            alignItems: "center",
            textAlign: "justify",
          },
        },
        error: errors.plan,
      }}
    />
  );
};
export default FieldPlan;
