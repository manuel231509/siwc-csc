package com.colegiosantacecilia.siwcspringjava.controlllers.teacher;

import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.teacher.TeacherEntity;
import com.colegiosantacecilia.siwcspringjava.services.degrees.DegreesService;
import com.colegiosantacecilia.siwcspringjava.services.session.SessionService;
import com.colegiosantacecilia.siwcspringjava.services.subject.SubjectService;
import com.colegiosantacecilia.siwcspringjava.services.teacher.TeacherService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
@RequestMapping(value = "/teacher", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class TeacherRestController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private DegreesService degreesService;

    @Autowired
    private SubjectService SubjectService;

    @Autowired
    private SessionService sessionService;

    @GetMapping(value = "/all-teacher")
    @PreAuthorize("hasRole('TEACHER') OR hasRole('ADMIN')")
    public ResponseEntity<?> getAllTeacher() {
        List<TeacherEntity> listTeacher = teacherService.getAll();
        if (!listTeacher.isEmpty()) {
            return new ResponseEntity(listTeacher,
                    HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO TEACHERS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/degrees-according-to-teacher/{idNumberTeacher}")
    @PreAuthorize("hasRole('TEACHER') OR hasRole('ADMIN')")
    public ResponseEntity<?> getDegreesAccordingToTeacher(@PathVariable Long idNumberTeacher) {
        try {
            List<DegreeEntity> degreeEntitys = degreesService.getDegreeAccordingToTeacher(idNumberTeacher);
            if (degreeEntitys.isEmpty()) {
                return new ResponseEntity("{\"message\":\"NO DEGREES LOGS HAS BEEN FOUND.\"}",
                        HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity(degreeEntitys, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/find-subjects-byIdNumberTeacherAndIdDegree/{idNumberTeacher}/{idDegree}")
    @PreAuthorize("hasRole('TEACHER') OR hasRole('ADMIN')")
    public ResponseEntity<?> getSubjectsByIdNumberTeacherAndIdDegree(@PathVariable Long idNumberTeacher, @PathVariable String idDegree) {
        try {
            List<SubjectEntity> subjectEntitys = SubjectService.getSubjectsByIdNumberTeacherAndIdDegree(idNumberTeacher, idDegree);
            if (subjectEntitys.isEmpty()) {
                return new ResponseEntity("{\"message\":\"NO SUBJECTS LOGS HAS BEEN FOUND.\"}", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity(subjectEntitys, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/find-teacher-byId/{teacherId}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('TEACHER') OR hasRole('STUDENT')")
    public ResponseEntity<?> getByIdTeacher(@PathVariable Long teacherId) {
        return teacherService.getById(teacherId)
                .map(teacher
                        -> new ResponseEntity(teacher,
                        HttpStatus.OK)
                ).orElse(new ResponseEntity("{\"message\":\"TEACHER ID NUMBER WAS NOT FOUND.\"}",
                        HttpStatus.NOT_FOUND));
    }

    @PostMapping(value = "/save-teacher")
    public ResponseEntity<?> saveTeacher(@RequestBody TeacherEntity teacherEntity) {
        Optional<TeacherEntity> getByIdTeacher = teacherService.getById(teacherEntity.getIdNumberTeacher());
        Optional<SessionEntity> getByIdSession = sessionService.getById(teacherEntity.getIdNumberSession());
        if (getByIdTeacher.isPresent()) {
            return new ResponseEntity("{\"message\":\"THE ID YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                    HttpStatus.BAD_REQUEST);
        } else if (!getByIdSession.isPresent()) {
            return new ResponseEntity("{\"message\":\"THE SESSION IDENTIFICATION NUMBER IS NOT REGISTERED IN THE SESSION TABLE.\"}",
                    HttpStatus.BAD_REQUEST);
        }

        teacherService.save(teacherEntity);
        return new ResponseEntity("{\"message\":\"THE TEACHER'S REGISTRATION WAS SUCCESSFUL.\"}",
                HttpStatus.CREATED);
    }

    @PutMapping(value = "/update-teacher/{teacherId}")
    public ResponseEntity<?> updateTeacher(@RequestBody TeacherEntity teacherEntity, @PathVariable Long teacherId) {
        Optional<TeacherEntity> getByIdTeacher = teacherService.getById(teacherId);
        if (getByIdTeacher.isPresent()) {
            teacherService.save(teacherEntity);
            return new ResponseEntity("{\"message\":\"THE TEACHER WAS SUCCESSFULLY UPGRADED.\"}",
                    HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"COULD NOT UPDATE THE TEACHER SUCCESSFULLY, THE STUDENT ID DOES NOT EXIST.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/delete-teacher/{teacherId}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long teacherId) {
        return teacherService.getById(teacherId)
                .map((teacher) -> {
                    teacherService.deleteById(teacher.getIdNumberTeacher());
                    return new ResponseEntity("{\"message\":\"THE STUDENT WAS SUCCESSFULLY ELIMINATED.\"}",
                            HttpStatus.OK);
                })
                .orElse(new ResponseEntity("{\"message\":\"THE STUDENT COULD NOT BE DELETED SUCCESSFULLY, THE STUDENT ID DOES NOT EXIST.\"}",
                        HttpStatus.NOT_FOUND));
    }
}
