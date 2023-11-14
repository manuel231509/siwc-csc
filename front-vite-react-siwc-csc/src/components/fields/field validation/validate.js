const validate = (fieldsValues, tempErrors, fields, nameField) => {
  if ("fullNames" in fieldsValues)
    tempErrors.fullNames = fieldsValues.fullNames
      ? !/^[a-zA-ZÀ-ÿ\s]+$/i.test(fieldsValues.fullNames)
        ? "ONLY LETTERS ALLOWED."
        : !(
            fieldsValues.fullNames.length < 3 ||
            fieldsValues.fullNames.length > 30
          )
        ? ""
        : "THE 'FULL NAMES' FIELD MUST BE AT LEAST 3 CHARACTERS LONG AND AT MOST 30 CHARACTERS LONG."
      : "THE 'FULL NAMES' FIELD IS REQUIRED.";

  if ("fullSurNames" in fieldsValues)
    tempErrors.fullSurNames = fieldsValues.fullSurNames
      ? !/^[a-zA-ZÀ-ÿ\s]+$/i.test(fieldsValues.fullSurNames)
        ? "ONLY LETTERS ALLOWED."
        : !(
            fieldsValues.fullSurNames.length < 3 ||
            fieldsValues.fullSurNames.length > 30
          )
        ? ""
        : "THE 'FULL SURNAME' FIELD MUST BE AT LEAST 3 CHARACTERS LONG AND AT MOST 30 CHARACTERS LONG."
      : "THE 'FULL SURNAMES' FIELD IS REQUIRED.";

  if ("documentType" in fieldsValues)
    tempErrors.documentType = fieldsValues.documentType
      ? ""
      : "SELECT DOCUMENT TYPE, THE 'DOCUMENT TYPE' FIELD IS REQUIRED.";

  if ("idNumber" in fieldsValues)
    tempErrors.idNumber = fieldsValues.idNumber
      ? /^[0-9]+$/i.test(fieldsValues.idNumber)
        ? ""
        : "ONLY NUMBERS ALLOWED."
      : "THE 'ID NUMBER' FIELD IS REQUIRED.";

  if ("phoneNumber" in fieldsValues)
    tempErrors.phoneNumber = fieldsValues.phoneNumber
      ? !/^[0-9]+$/i.test(fieldsValues.phoneNumber)
        ? "ONLY NUMBERS ALLOWED."
        : !(
            fieldsValues.phoneNumber.length < 10 ||
            fieldsValues.phoneNumber.length > 10
          )
        ? ""
        : "THE 'PHONE NUMBER' FIELD MUST BE AT LEAST 10 CHARACTERS LONG AND AT MOST 10 CHARACTERS LONG."
      : "THE 'PHONE NUMBER' FIELD IS REQUIRED.";

  if ("role" in fieldsValues)
    tempErrors.role = fieldsValues.role ? "" : "THE 'ROLE' FIELD IS REQUIRED.";

  if ("email" in fieldsValues)
    tempErrors.email = !fieldsValues.email
      ? "THE 'EMAIL' FIELD IS REQUIRED."
      : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
          fieldsValues.email
        )
      ? ""
      : "THE 'EMAIL' FIELD IS NOT VALID.";

  if ("password" in fieldsValues)
    tempErrors.password = fieldsValues.password
      ? ""
      : "THE 'PASSWORD' FIELD IS REQUIRED.";

  if ("grades" in fieldsValues)
    tempErrors.grades = fieldsValues.grades
      ? ""
      : "THE 'GRADES' FIELD IS REQUIRED.";

  if ("periods" in fieldsValues)
    tempErrors.periods = fieldsValues.periods
      ? ""
      : "THE 'PERIODS' FIELD IS REQUIRED.";

  if ("title" in fieldsValues)
    tempErrors.title = fieldsValues.title
      ? ""
      : "THE 'TITLE' FIELD IS REQUIRED.";

  if ("students" in fieldsValues)
    tempErrors.students =
      fieldsValues.students.length >= 1
        ? ""
        : "SELECT A STUDENT, THE 'STUDENTS' FIELD IS REQUIRED.";

  if ("qualificationPoints" in fieldsValues)
    tempErrors.qualificationPoints = fieldsValues.qualificationPoints
      ? ""
      : "SELECT A QUALIFICATION POINTS, THE 'QUALIFICATION POINTS' FIELD IS REQUIRED.";

  if ("deadline" in fieldsValues)
    tempErrors.deadline = fieldsValues?.deadline
      ? fieldsValues?.deadline?.toString() !== "Invalid Date"
        ? Date.parse(fieldsValues?.deadline?.toDateString()) >=
          Date.parse(new Date().toDateString())
          ? ""
          : "THE DATE YOU ARE ENTERING MUST BE GREATER THAN OR EQUAL TO THE CURRENT DATE.  THE YEAR MUST BE EQUAL TO THE CURRENT YEAR."
        : fieldsValues?.deadline?.toString().toUpperCase()
      : "";

  if ("timeLimit" in fieldsValues) {
    const currentDate = new Date();
    tempErrors.timeLimit = fields.deadline
      ? fieldsValues.timeLimit
        ? fieldsValues?.timeLimit?.toString() !== "Invalid Date"
          ? fields?.deadline?.toDateString() === currentDate.toDateString()
            ? fieldsValues?.timeLimit?.getHours() === currentDate.getHours()
              ? fieldsValues?.timeLimit?.getMinutes() >=
                currentDate.getMinutes() + 30
                ? ""
                : "THE MINUTES MUST BE GREATER OR EQUAL TO 30 MINUTES WITH THE CURRENT TIME."
              : fieldsValues?.timeLimit?.getHours() >= currentDate.getHours()
              ? ""
              : "THE TIME YOU ARE ENTERING MUST BE GREATER THAN TO THE CURRENT TIME."
            : ""
          : "INVALID TIME"
        : "THE 'TIME LIMIT' FIELD IS REQUIRED"
      : "";
  }

  if ("plan" in fieldsValues)
    tempErrors.plan =
      fieldsValues.plan || fieldsValues.plan !== null
        ? ""
        : "THE 'PLAN' FIELD IS REQUIRED";

  if ("subjects" in fieldsValues)
    tempErrors.subjects = fieldsValues.subjects
      ? ""
      : "SELECT A SUBJECT TO SEE THE ASSIGNED TASKS.";

  if ("files" in fieldsValues)
    tempErrors.files =
      fieldsValues.files.length > 0
        ? ""
        : "THE 'ATTACH FILE' FIELD IS REQUIRED.";

  if ("qualificationNote" in fieldsValues)
    tempErrors.qualificationNote = fieldsValues.qualificationNote
      ? /^-?\d+(\.\d+)?$/.test(fieldsValues.qualificationNote)
        ? fieldsValues.qualificationNote >= 0.0 &&
          fieldsValues.qualificationNote <= 5.0
          ? ""
          : "THE RATING RANGE IS FROM 0 TO 5."
        : "THE 'QUALIFICATION NOTE FIELD IS INVALID'"
      : "THE 'QUALIFICATION NOTE' FIELD IS REQUIRED.";

  if ("BIMONTHLY" in fieldsValues)
    tempErrors.BIMONTHLY = fieldsValues.BIMONTHLY
      ? /^-?\d+(\.\d+)?$/.test(fieldsValues.BIMONTHLY)
        ? fieldsValues.BIMONTHLY >= 0.0 && fieldsValues.BIMONTHLY <= 5.0
          ? ""
          : "THE RATING RANGE IS FROM 0 TO 5."
        : "THE 'QUALIFICATION NOTE FIELD IS INVALID'"
      : "THE 'QUALIFICATION NOTE' FIELD IS REQUIRED.";

  if (`noteTask_${nameField}` in fieldsValues)
    tempErrors[`noteTask_${nameField}`] = fieldsValues[`noteTask_${nameField}`]
      ? /^-?\d+(\.\d+)?$/.test(fieldsValues[`noteTask_${nameField}`])
        ? fieldsValues[`noteTask_${nameField}`] >= 0.0 &&
          fieldsValues[`noteTask_${nameField}`] <= 5.0
          ? ""
          : "THE RATING RANGE IS FROM 0 TO 5."
        : "THE 'QUALIFICATION NOTE FIELD IS INVALID'"
      : "THE 'QUALIFICATION NOTE' FIELD IS REQUIRED.";
  if (`bimonthly_${nameField}` in fieldsValues)
    tempErrors[`bimonthly_${nameField}`] = fieldsValues[
      `bimonthly_${nameField}`
    ]
      ? /^-?\d+(\.\d+)?$/.test(fieldsValues[`bimonthly_${nameField}`])
        ? fieldsValues[`bimonthly_${nameField}`] >= 0.0 &&
          fieldsValues[`bimonthly_${nameField}`] <= 5.0
          ? ""
          : "THE RATING RANGE IS FROM 0 TO 5."
        : "THE 'QUALIFICATION NOTE FIELD IS INVALID'"
      : "THE 'QUALIFICATION NOTE' FIELD IS REQUIRED.";

  if ("messageChatbot" in fieldsValues)
    tempErrors.messageChatbot = fieldsValues.messageChatbot
      ? /^.{0,70}$/.test(fieldsValues.messageChatbot)
        ? ""
        : "THE 'MESSAGE' FIELD MUST NOT BE LONGER THAN 70 CHARACTERS."
      : "THE 'MESSAGE' FIELD IS REQUIRED.";
};

export default validate;
