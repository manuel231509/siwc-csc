import Controls from "../controls/Controls";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const FieldStudents = (props) => {
  const {
    fields,
    handleChangeFields,
    errors,
    listStudents,
    handleClickFieldsAllStudents,
  } = props;
  console.log("fields.students: ", fields.students);
  return (
    <Controls.SelectCheckMark
      formControlProps={{
        fullWidth: true,
      }}
      inputLabelProps={{
        id: "select-students-label",
        required: true,
        label: `Student${fields.students.length > 1 ? "S" : ""}`,
        sx: {
          fontSize: { xs: 12, sm: 14, md: 16 },
          display: "flex",
          alignItems: "center",
        },
      }}
      selectProps={{
        labelId: "select-students-label",
        id: "select-students",
        name: "students",
        value: fields.students,
        onChange: handleChangeFields("students"),
        autoWidth: true,
        multiple: true,
        renderValue: (selected) =>
          selected.length + ` STUDENT${selected.length >= 2 ? "S" : ""}`,
        MenuProps: MenuProps,
        "aria-describedby": "component-error-text",
        sx: {
          textAlign: "center",
          fontSize: { xs: 13, sm: 14, md: 15 },
        },
      }}
      formHelperTextProps={{
        id: "component-error-text",
        sx: {
          display: "flex",
          alignItems: "center",
          textAlign: "justify",
        },
      }}
      menuItemProps={{
        onClick: handleClickFieldsAllStudents,
      }}
      names={listStudents}
      error={errors.students}
    />
  );
};
export default FieldStudents;
