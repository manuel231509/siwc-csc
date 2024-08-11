import { AddTask as AddTaskIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../../../../../../hooks/useForm";
import useWindowSize from "../../../../../../../hooks/useWindowSize";
import { FormStyled } from "./Styled/FormAddAchievementsStyled";
import FieldsControl from "../../../../../../fields/FieldsControl";
import validate from "../../../../../../fields/field validation/validate";

const initialStateFields = {
  mainAchievements: null,
  achRecommendations: null,
  achDifficulties: null,
};

const FormAddAchievements = () => {
  const windowSize = useWindowSize();
  const [fieldValidate, setFieldValidate] = useState(false);

  const validateFields = (fieldsValues = fields, nameField) => {
    const tempErrors = { ...errors };

    validate(fieldsValues, tempErrors, fields);

    setErrors({ ...tempErrors });

    const fieldValid = Object.values(tempErrors).every((v) => v === "");

    setFieldValidate(!fieldValid);

    if (fieldsValues === fields) {
      return fieldValid;
    }
  };

  const {
    fields,
    setFields,
    handleChangeFields,
    handleChangeFields1,
    handleChangeFields2,
    handleChangeFieldAutoComplete,
    errors,
    setErrors,
    resetFields,
  } = useForm(initialStateFields, true, validateFields);

  const handleSubmitAddAchievements = async (event) => {
    event.preventDefault();
    console.log("submit add achievements");
    // if (validateFields()) {
    //   show
    // }
  };

  const handleClickClose = (nameField) => (e) => {
    e.preventDefault();
  };

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <FormStyled
        onSubmit={handleSubmitAddAchievements}
        sx={{
          ...(windowSize.width > 600 && {
            width: "95%",
          }),
        }}
      >
        <Grid
          container
          columnGap={{ xs: 2, sm: 2.5, md: 3.5 }}
          rowGap={2}
          alignItems={"center"}
        >
          <Grid container rowGap={1.5} boxShadow={5} p={2}>
            <FieldsControl.FieldAchievements
              fields={fields}
              handleChangeFieldAutoComplete={handleChangeFieldAutoComplete}
              errors={errors}
              listAchievements={top100Films}
              nameField={"mainAchievements"}
              otherTextFieldProps={{
                label: "Main Achievements",
              }}
              otherAutoCompleteProps={{
                value: fields.achievements,
              }}
            />
            <FieldsControl.FieldAchievementDescription
              fields={fields}
              handleChangeFields={handleChangeFields}
              errors={errors}
              otherTextFieldProps={{
                variant: "filled",
                multiline: true,
                rows: 2,
              }}
              handleClickClose={handleClickClose}
            />
          </Grid>
          <Grid item xs container rowGap={1.5} boxShadow={5} p={2}>
            <FieldsControl.FieldAchievements
              fields={fields}
              handleChangeFieldAutoComplete={handleChangeFieldAutoComplete}
              errors={errors}
              nameField={"achRecommendations"}
              listAchievements={top100Films}
              otherTextFieldProps={{
                label: "Achievement Recommendations ",
              }}
            />
          </Grid>
          <Grid
            item
            {...(windowSize.width <= 550 ? { xs: 12 } : { xs: true })}
            container
            p={2}
            rowGap={1.5}
            boxShadow={5}
          >
            <FieldsControl.FieldAchievements
              fields={fields}
              handleChangeFieldAutoComplete={handleChangeFieldAutoComplete}
              errors={errors}
              nameField={"achDifficulties"}
              listAchievements={top100Films}
              otherTextFieldProps={{
                label: "Achievement Difficulties ",
              }}
            />
          </Grid>
        </Grid>
        <Grid container mt={3} mb={0} rowSpacing={5} justifyContent="center">
          <LoadingButton
            type="submit"
            aria-label="add a achievement"
            color="secondary"
            size="large"
            // loading={loading["periodPlanTask"]}
            loadingPosition="start"
            startIcon={<AddTaskIcon />}
            // disabled={fieldValidate}
            variant="contained"
          >
            <span>Add</span>
          </LoadingButton>
        </Grid>
      </FormStyled>
    </Grid>
  );
};
const top100Films = [
  { description: "The Shawshank Redemption", year: 1994 },
  { description: "The Godfather", year: 1972 },
  { description: "The Godfather: Part II", year: 1974 },
  { description: "The Dark Knight", year: 2008 },
  { description: "12 Angry Men", year: 1957 },
  { description: "Schindler's List", year: 1993 },
  { description: "Pulp Fiction", year: 1994 },
  {
    description: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { description: "The Good, the Bad and the Ugly", year: 1966 },
  { description: "Fight Club", year: 1999 },
  {
    description: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    description: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { description: "Forrest Gump", year: 1994 },
  { description: "Inception", year: 2010 },
  {
    description: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { description: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { description: "Goodfellas", year: 1990 },
  { description: "The Matrix", year: 1999 },
  { description: "Seven Samurai", year: 1954 },
  {
    description: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { description: "City of God", year: 2002 },
  { description: "Se7en", year: 1995 },
  { description: "The Silence of the Lambs", year: 1991 },
  { description: "It's a Wonderful Life", year: 1946 },
  { description: "Life Is Beautiful", year: 1997 },
  { description: "The Usual Suspects", year: 1995 },
  { description: "Léon: The Professional", year: 1994 },
  { description: "Spirited Away", year: 2001 },
  { description: "Saving Private Ryan", year: 1998 },
  { description: "Once Upon a Time in the West", year: 1968 },
  { description: "American History X", year: 1998 },
  { description: "Interstellar", year: 2014 },
  { description: "Casablanca", year: 1942 },
  { description: "City Lights", year: 1931 },
  { description: "Psycho", year: 1960 },
  { description: "The Green Mile", year: 1999 },
  { description: "The Intouchables", year: 2011 },
  { description: "Modern Times", year: 1936 },
  { description: "Raiders of the Lost Ark", year: 1981 },
  { description: "Rear Window", year: 1954 },
  { description: "The Pianist", year: 2002 },
  { description: "The Departed", year: 2006 },
  { description: "Terminator 2: Judgment Day", year: 1991 },
  { description: "Back to the Future", year: 1985 },
  { description: "Whiplash", year: 2014 },
  { description: "Gladiator", year: 2000 },
  { description: "Memento", year: 2000 },
  { description: "The Prestige", year: 2006 },
  { description: "The Lion King", year: 1994 },
  { description: "Apocalypse Now", year: 1979 },
  { description: "Alien", year: 1979 },
  { description: "Sunset Boulevard", year: 1950 },
  {
    description:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { description: "The Great Dictator", year: 1940 },
  { description: "Cinema Paradiso", year: 1988 },
  { description: "The Lives of Others", year: 2006 },
  { description: "Grave of the Fireflies", year: 1988 },
  { description: "Paths of Glory", year: 1957 },
  { description: "Django Unchained", year: 2012 },
  { description: "The Shining", year: 1980 },
  { description: "WALL·E", year: 2008 },
  { description: "American Beauty", year: 1999 },
  { description: "The Dark Knight Rises", year: 2012 },
  { description: "Princess Mononoke", year: 1997 },
  { description: "Aliens", year: 1986 },
  { description: "Oldboy", year: 2003 },
  { description: "Once Upon a Time in America", year: 1984 },
  { description: "Witness for the Prosecution", year: 1957 },
  { description: "Das Boot", year: 1981 },
  { description: "Citizen Kane", year: 1941 },
  { description: "North by Northwest", year: 1959 },
  { description: "Vertigo", year: 1958 },
  {
    description: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { description: "Reservoir Dogs", year: 1992 },
  { description: "Braveheart", year: 1995 },
  { description: "M", year: 1931 },
  { description: "Requiem for a Dream", year: 2000 },
  { description: "Amélie", year: 2001 },
  { description: "A Clockwork Orange", year: 1971 },
  { description: "Like Stars on Earth", year: 2007 },
  { description: "Taxi Driver", year: 1976 },
  { description: "Lawrence of Arabia", year: 1962 },
  { description: "Double Indemnity", year: 1944 },
  {
    description: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { description: "Amadeus", year: 1984 },
  { description: "To Kill a Mockingbird", year: 1962 },
  { description: "Toy Story 3", year: 2010 },
  { description: "Logan", year: 2017 },
  { description: "Full Metal Jacket", year: 1987 },
  { description: "Dangal", year: 2016 },
  { description: "The Sting", year: 1973 },
  { description: "2001: A Space Odyssey", year: 1968 },
  { description: "Singin' in the Rain", year: 1952 },
  { description: "Toy Story", year: 1995 },
  { description: "Bicycle Thieves", year: 1948 },
  { description: "The Kid", year: 1921 },
  { description: "Inglourious Basterds", year: 2009 },
  { description: "Snatch", year: 2000 },
  { description: "3 Idiots", year: 2009 },
  { description: "Monty Python and the Holy Grail", year: 1975 },
];
export default FormAddAchievements;
