package com.colegiosantacecilia.siwcspringjava.controlllers.student;

import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.colegiosantacecilia.siwcspringjava.services.session.SessionService;
import com.colegiosantacecilia.siwcspringjava.services.student.StudentService;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@RestController
@RequestMapping(value = "/student", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class StudentRestController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private SessionService sessionService;

    @GetMapping(value = "/all-student")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT') or hasRole('TEACHER')")
    public ResponseEntity<?> getAllStudent() {
        List<?> listStudents = studentService.getAll();
        if (!listStudents.isEmpty()) {
            return new ResponseEntity(listStudents,
                    HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO STUDENTS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/find-student-byId/{studentId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT') or hasRole('TEACHER')")
    public ResponseEntity<?> getByIdStudent(@PathVariable Long studentId) {
        return studentService.getById(studentId)
                .map(student -> new ResponseEntity(student,
                HttpStatus.FOUND))
                .orElse(new ResponseEntity("{\"message\":\"STUDENT ID NUMBER WAS NOT FOUND.\"}",
                        HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/find-students-byIdDegree/{degreeId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT') or hasRole('TEACHER')")
    public ResponseEntity<?> getStudentsByIdDegree(@PathVariable String degreeId) {
        try {
            List<StudentEntity> studentEntitys = studentService.getStudentAccordingDegree(degreeId);
            return new ResponseEntity(studentEntitys.isEmpty()
                    ? "{\"message\":\"NO STUDENTS LOGS HAS BEEN FOUND.\"}"
                    : studentEntitys,
                    studentEntitys.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "find-students-byIdDegreeAndIdSubjectAndIdNumberTeacher"
            + "/{idDegree}/{idSubject}/{idNumberTeacher}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('TEACHER')")
    public ResponseEntity<?> getStudentsByIdDegreeAndIdSubjectAndIdNumberTeacher(@PathVariable String idDegree,
            @PathVariable String idSubject, @PathVariable Long idNumberTeacher) {
        try {
            List<StudentEntity> studentEntitys = studentService.getStudentsByDegreeAndTeacherSubejct(idDegree,
                    idSubject, idNumberTeacher);
            return new ResponseEntity(studentEntitys.isEmpty()
                    ? "{\"message\":\"NO STUDENTS LOGS HAS BEEN FOUND.\"}"
                    : studentEntitys,
                    studentEntitys.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "find-students-byIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher"
            + "/{idPeriod}/{idDegree}/{idSubject}/{idNumberTeacher}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('TEACHER')")
    public ResponseEntity<?> getStudentsByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher(
            @Valid @PathVariable String idPeriod, @Valid @PathVariable String idDegree,
            @Valid @PathVariable String idSubject, @Valid @PathVariable Long idNumberTeacher) {
        try {
            List<StudentEntity> studentEntitys
                    = studentService
                            .getStudentsByPeriodAndDegreeAndSubjectAndTeacher(
                                    idPeriod, idDegree,
                                    idSubject, idNumberTeacher);
            return new ResponseEntity(studentEntitys.isEmpty()
                    ? "{\"message\":\"NO STUDENTS LOGS HAS BEEN FOUND.\"}"
                    : studentEntitys,
                    studentEntitys.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "find-students-byIdNumberTeacherAndIdTask/{idNumberTeacher}/{idTask}")
    public ResponseEntity<?> getStudentsByIdNumberTeacherAndIdTask(@Valid @PathVariable Long idNumberTeacher,
            @Valid @PathVariable String idTask) {
        try {
            List<StudentEntity> studentEntitys = studentService.getStudentsByTeacherAndTask(idNumberTeacher, idTask);
            return new ResponseEntity(studentEntitys.isEmpty()
                    ? "{\"message\":\"NO ASSIGNMENTS POSTED BY THE STUDENT WERE FOUND.\"}"
                    : studentEntitys,
                    studentEntitys.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-student")
    public ResponseEntity<?> saveStudent(@RequestBody StudentEntity studentEntity) {
        try {
            Optional<StudentEntity> getByIdStudent = studentService.getById(studentEntity.getIdNumberStudent());
            Optional<SessionEntity> getByIdSession = sessionService.getById(studentEntity.getIdNumberSession());
            if (getByIdStudent.isPresent()) {
                return new ResponseEntity("{\"message\":\"THE ID YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                        HttpStatus.BAD_REQUEST);
            } else if (!getByIdSession.isPresent()) {
                return new ResponseEntity(
                        "{\"message\":\"THE SESSION IDENTIFICATION NUMBER IS NOT REGISTERED IN THE SESSION TABLE.\"}",
                        HttpStatus.BAD_REQUEST);
            }
            studentService.save(studentEntity);
            return new ResponseEntity("{\"message\":\"THE STUDENT'S REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/update-student/{studentId}")
    public ResponseEntity<?> updateStudent(@RequestBody StudentEntity studentEntity, @PathVariable Long studentId) {
        Optional<StudentEntity> getByIdStudent = studentService.getById(studentId);
        if (getByIdStudent.isPresent()) {
            studentService.save(studentEntity);
            return new ResponseEntity("{\"message\":\"THE STUDENT WAS SUCCESSFULLY UPGRADED.\"}",
                    HttpStatus.OK);
        } else {
            return new ResponseEntity(
                    "{\"message\":\"COULD NOT UPDATE THE STUDENT SUCCESSFULLY, THE STUDENT ID DOES NOT EXIST.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/delete-student/{studentId}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long studentId) {
        return studentService.getById(studentId)
                .map((student) -> {
                    studentService.deleteById(student.getIdNumberStudent());
                    return new ResponseEntity("{\"message\":\"THE STUDENT WAS SUCCESSFULLY ELIMINATED.\"}",
                            HttpStatus.OK);
                })
                .orElse(new ResponseEntity(
                        "{\"message\":\"THE STUDENT COULD NOT BE DELETED SUCCESSFULLY, THE STUDENT ID DOES NOT EXIST.\"}",
                        HttpStatus.NOT_FOUND));
    }
}
