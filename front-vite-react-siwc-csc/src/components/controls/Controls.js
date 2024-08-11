import { lazy } from "react";

const FilledInput = lazy(() =>
  import("./Input").then((module) => ({ default: module.FilledInput }))
);
const Input = lazy(() =>
  import("./Input").then((module) => ({ default: module.Input }))
);
const OutlinedInput = lazy(() =>
  import("./Input").then((module) => ({ default: module.OutlinedInput }))
);
const DatePicker = lazy(() =>
  import("./Pickers").then((module) => ({ default: module.DatePicker }))
);
const DesktopDatePicker = lazy(() =>
  import("./Pickers").then((module) => ({ default: module.DesktopDatePicker }))
);
const DesktopTimePicker = lazy(() =>
  import("./Pickers").then((module) => ({ default: module.DesktopTimePicker }))
);
const MobileDatePicker = lazy(() =>
  import("./Pickers").then((module) => ({ default: module.MobileDatePicker }))
);
const TimePicker = lazy(() =>
  import("./Pickers").then((module) => ({ default: module.TimePicker }))
);
const Select = lazy(() =>
  import("./Select").then((module) => ({ default: module.Select }))
);
const SelectCheckMark = lazy(() =>
  import("./Select").then((module) => ({ default: module.SelectCheckMark }))
);
const AutoComplete = lazy(() => import("./AutoComplete"));
const RadioButton = lazy(() => import("./RadioButton"));

const Controls = {
  Input,
  OutlinedInput,
  FilledInput,
  Select,
  SelectCheckMark,
  RadioButton,
  DatePicker,
  DesktopDatePicker,
  MobileDatePicker,
  DesktopTimePicker,
  TimePicker,
  AutoComplete,
};

export default Controls;
