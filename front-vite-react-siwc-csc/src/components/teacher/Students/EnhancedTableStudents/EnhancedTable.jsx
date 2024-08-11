import {
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTeacherContext } from "../../../../context/Teacher/TeacherProvider";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad";
import { getStudentByIdDegree } from "../../../../services/student/StudentService";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const headCells = [
  {
    id: "idNumberStudent",
    numeric: true,
    string: false,
    disablePadding: true,
    label: "ID NUMBER OF STUDENT",
  },
  {
    id: "documentTypeStudent",
    numeric: false,
    string: true,
    disablePadding: false,
    label: "DOCUMENT TYPE OF STUDENT",
  },
  {
    id: "fullNamesStudent",
    numeric: false,
    string: true,
    disablePadding: false,
    label: "FULL NAMES OF STUDENT",
  },
  {
    id: "fullSurNamesStudent",
    numeric: false,
    string: true,
    disablePadding: false,
    label: "FULL SUR NAMES OF STUDENT",
  },
  {
    id: "emailAddressStudent",
    numeric: false,
    string: true,
    disablePadding: false,
    label: "EMAIL ADDRESS OF STUDENT",
  },
  {
    id: "phoneNumberStudent",
    numeric: true,
    string: false,
    disablePadding: false,
    label: "PHONE NUMBER OF STUDENT",
  },
];

const EnhancedTable = () => {
  const { loading, callEndPoint } = useFetchAndLoad();

  const ssessionState = useSelector((store) => store.ssession);

  const { jwt, bearer } = ssessionState;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombres");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { modalData } = useTeacherContext();

  const [students, setStudents] = useState({ data: [], error: {} });

  const handleChangeStudents = (nameField, value) => {
    setStudents({ ...students, [nameField]: value });
  };

  const getApiStudentAccordingDegree = async (idDegree, jwt, bearer) =>
    await callEndPoint(getStudentByIdDegree(idDegree, jwt, bearer));

  useEffect(() => {
    console.log("modaldata: ", modalData);
    getApiStudentAccordingDegree(modalData.degree.idDegree, jwt, bearer)
      .then(({ data }) => {
        console.log("students data: ", data);
        handleChangeStudents("data", data);
      })
      .catch((error) => handleChangeStudents("error", error.response.data));
  }, []);

  const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestShort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestShort(event, property, property);
    };
    return (
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {headCells.map((headCell,index) => (
            <TableCell
              key={index}
              align={
                headCell.numeric ? "right" : headCell.string ? "center" : "left"
              }
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : "asc"}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography fontWeight={700} fontSize={"10px"}>
                  {headCell.label}
                </Typography>
                {orderBy === headCell.id ? (
                  <Box component={"span"} sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  EnhancedTableHead.propTypes = {
    onRequestShort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.data.lenght) : 0;

  return (
    <Grid item sx={{ width: "100%" }} container>
      <Paper sx={{ width: "100%", mb: 2, mt: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestShort={handleRequestSort}
            />
            <TableBody>
              {!loading &&
                students.data
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={index}
                      >
                        <TableCell></TableCell>
                        <TableCell
                          component={"th"}
                          scope="row"
                          padding="none"
                          align={
                            headCells[0].numeric
                              ? "right"
                              : headCells[0].string
                              ? "center"
                              : "left"
                          }
                        >
                          {student.idNumberStudent}
                        </TableCell>
                        <TableCell
                          align={
                            headCells[1].numeric
                              ? "right"
                              : headCells[1].string
                              ? "center"
                              : "left"
                          }
                        >
                          {student.documentTypeStudent}
                        </TableCell>
                        <TableCell
                          align={
                            headCells[2].numeric
                              ? "right"
                              : headCells[2].string
                              ? "center"
                              : "left"
                          }
                        >
                          {student.fullNamesStudent}
                        </TableCell>
                        <TableCell
                          align={
                            headCells[3].numeric
                              ? "right"
                              : headCells[3].string
                              ? "center"
                              : "left"
                          }
                        >
                          {student.fullSurNamesStudent}
                        </TableCell>
                        <TableCell
                          align={
                            headCells[4].numeric
                              ? "right"
                              : headCells[4].string
                              ? "center"
                              : "left"
                          }
                        >
                          {student.emailAddressStudent}
                        </TableCell>
                        <TableCell
                          align={
                            headCells[5].numeric
                              ? "right"
                              : headCells[5].string
                              ? "center"
                              : "left"
                          }
                        >
                          {student.phoneNumberStudent}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {students.data.length <= 0 && !loading && (
                <TableRow hover tabIndex={-1}>
                  <TableCell align="center" colSpan={7}>
                    {!loading ? (
                      <Typography fontWeight={600}>
                        {students.error.message}
                      </Typography>
                    ) : (
                      <CircularProgress disableShrink />
                    )}
                  </TableCell>
                </TableRow>
              )}
              {loading && (
                <TableRow hover tabIndex={-1}>
                  <TableCell align="center" colSpan={7}>
                    <CircularProgress disableShrink />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 30]}
          component="div"
          count={students.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
};
export default EnhancedTable;
