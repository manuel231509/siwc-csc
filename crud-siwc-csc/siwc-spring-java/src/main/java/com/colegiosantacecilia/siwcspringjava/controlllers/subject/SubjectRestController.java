package com.colegiosantacecilia.siwcspringjava.controlllers.subject;

import com.colegiosantacecilia.siwcspringjava.dto.subject.SubjectDTO;
import com.colegiosantacecilia.siwcspringjava.dto.subject.SubjectTeacherDTO;
import com.colegiosantacecilia.siwcspringjava.dto.teacher.TeacherDTO;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.teacher.TeacherEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.subject.SubjectMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.teacher.TeacherMapper;
import com.colegiosantacecilia.siwcspringjava.services.subject.SubjectService;
import com.colegiosantacecilia.siwcspringjava.services.teacher.TeacherService;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Sebastian Villamizar
 */
@RestController
@RequestMapping(value = "/subject", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class SubjectRestController {

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private SubjectMapper subjectMapper;

    @Autowired
    private TeacherMapper teacherMapper;

    @GetMapping(value = "all-subjects")
    public ResponseEntity<?> getAllSubject() {
        List<?> listSubjects = subjectService.getAll();
        if (!listSubjects.isEmpty()) {
            return new ResponseEntity(listSubjects,
                    HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO SUBJECTS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/find-subject-byId/{subjectId}")
    public ResponseEntity<?> getByIdSubject(@PathVariable String subjectId) {
        return subjectService.getById(subjectId)
                .map(subject
                        -> new ResponseEntity(subject,
                        HttpStatus.OK))
                .orElse(new ResponseEntity("{\"message\":\"SUBJECT ID NUMBER WAS NOT FOUND.\"}",
                        HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/find-subjects-byIdDegreeStudent/{idDegree}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('STUDENT')")
    public ResponseEntity<?> getSubjectsByIdDegreeStudent(@PathVariable String idDegree) {

        List<SubjectEntity> subjectEntitys = subjectService.getSubjectsByIdDegreeStudent(idDegree);
        if (subjectEntitys.isEmpty()) {
            return new ResponseEntity("{\"message\":\"SORRY, NO SUBJECTS ASSIGNED "
                    + "WITH GRADE " + idDegree.split("G")[1] + " WERE FOUND.\"}", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(subjectEntitys, HttpStatus.OK);
    }

    @GetMapping(value = "/find-subjects-byIdNumberStudent/{idNumberStudent}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('STUDENT')")
    public ResponseEntity<?> getSubjectsByIdNumberStudent(@PathVariable Long idNumberStudent) {

        List<SubjectEntity> subjectEntitys = subjectService.getSubjectsByIdNumberStudent(idNumberStudent);
        if (subjectEntitys.isEmpty()) {
            return new ResponseEntity("{\"message\":\"SORRY, NO SUBJECTS ASSIGNED "
                    + "WITH STUDENT " + idNumberStudent + " WERE FOUND.\"}", HttpStatus.NOT_FOUND);
        }

         List<SubjectTeacherDTO> subjectTeacherDTOs = new LinkedList<>();
        for (SubjectEntity subjectEntity : subjectEntitys) {
            TeacherEntity teacherEntity = teacherService.getByIdNumber(subjectEntity.getIdNumberTeacher()).get();
            SubjectTeacherDTO subjectTeacherDTO = subjectMapper.toSubjectTeacherDTO(subjectEntity);
            TeacherDTO teacherDTO = teacherMapper.toTeacherDTO(teacherEntity);
            subjectTeacherDTO.setTeacherDTO(teacherDTO);
            subjectTeacherDTOs.add(subjectTeacherDTO);
            
        }

        return new ResponseEntity(subjectTeacherDTOs, HttpStatus.OK);
    }

    @PostMapping(value = "/save-subject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveSubject(@Valid @RequestBody SubjectDTO subjectDTO) {
        try {
            Optional<SubjectEntity> getByNameSubject = subjectService.getNameSubject(subjectDTO.getName());
            if (getByNameSubject.isPresent()) {
                return new ResponseEntity("\"message\":\"THE NAME YOU ARE TYPING IS ALREADY REGISTERED.\"",
                        HttpStatus.BAD_REQUEST);
            }
            Optional<TeacherEntity> tOptional = teacherService.getById(subjectDTO.getIdNumberTeacher());
            if (!tOptional.isPresent()) {
                return new ResponseEntity("\"message\":\"THE IDENTIFICATION NUMBER OF THE TEACHER DOES NOT EXIST.\"",
                        HttpStatus.BAD_REQUEST);
            }
            String nameSubjectSplit[] = subjectDTO.getName().split(" ");
            String idSubject = "";

            for (int i = 0; i < nameSubjectSplit.length; i++) {
                String name = nameSubjectSplit[i];
                if (i > 0 && i <= nameSubjectSplit.length - 1) {
                    idSubject += "-";
                }
                idSubject += name.substring(0, 3);
            }

            SubjectEntity subjectEntity = subjectMapper.toSubjectEntity(subjectDTO);
            subjectEntity.setIdSubject(idSubject);
            subjectService.save(subjectEntity);
            return new ResponseEntity("{\"message\":\"THE SUBJECT REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-subjects")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveSubjects(@Valid @RequestBody List<SubjectDTO> listSubjectDTO) {
        try {
            for (SubjectDTO subjectDTO : listSubjectDTO) {
                Optional<SubjectEntity> getByNameSubject = subjectService.getNameSubject(subjectDTO.getName());
                if (getByNameSubject.isPresent()) {
                    return new ResponseEntity("\"message\":\"THE NAME YOU ARE TYPING IS ALREADY REGISTERED.\"",
                            HttpStatus.BAD_REQUEST);
                }
                Optional<TeacherEntity> tOptional = teacherService.getById(subjectDTO.getIdNumberTeacher());
                if (!tOptional.isPresent()) {
                    return new ResponseEntity("\"message\":\"THE IDENTIFICATION NUMBER OF THE TEACHER DOES NOT EXIST.\"",
                            HttpStatus.BAD_REQUEST);
                }
                String nameSubjectSplit[] = subjectDTO.getName().split(" ");
                String idSubject = "";

                for (int i = 0; i < nameSubjectSplit.length; i++) {
                    String name = nameSubjectSplit[i];
                    if (i > 0 && i <= nameSubjectSplit.length - 1) {
                        idSubject += "-";
                    }
                    idSubject += name.substring(0, 3);
                }

                SubjectEntity subjectEntity = subjectMapper.toSubjectEntity(subjectDTO);
                subjectEntity.setIdSubject(idSubject);
                subjectService.save(subjectEntity);
            }
            return new ResponseEntity("{\"message\":\"THE SUBJECT REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
