package com.colegiosantacecilia.siwcspringjava.controlllers.degreeSubject;

import com.colegiosantacecilia.siwcspringjava.dto.degreeSubject.DegreeSubjectDTO;
import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.degreeSubject.DegreeSubjectMapper;
import com.colegiosantacecilia.siwcspringjava.services.degreeSubject.DegreeSubjectService;
import com.colegiosantacecilia.siwcspringjava.services.degrees.DegreesService;
import com.colegiosantacecilia.siwcspringjava.services.subject.SubjectService;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sebastian Villamizar
 */
@RestController
@RequestMapping(value = "degree-subject", produces = "application/json")
public class DegreeSubjectRestController {

    @Autowired
    private DegreeSubjectService degreeSubjectService;

    @Autowired
    private DegreesService degreesService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private DegreeSubjectMapper degreeSubjectMapper;

    @GetMapping(value = "/all-degree-subject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllDegreeSubject() {
        List<?> listDegreeSubject = degreeSubjectService.getAll();
        if (!listDegreeSubject.isEmpty()) {
            return new ResponseEntity(listDegreeSubject, HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO DEGREE_SUBJECT LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/find-degree-subject-byId/{degSubjId}")
    @PreAuthorize("hasRole('ADMIN')")
    private ResponseEntity<?> getByIdDegreeSubject(@PathVariable String degSubjId) {
        try {
            return degreeSubjectService.getById(degSubjId)
                    .map(degreeSubj -> new ResponseEntity(degreeSubj, HttpStatus.OK))
                    .orElse(new ResponseEntity("{\"message\":\"DEGREE_SUBJECT ID NUMBER WAS NOT FOUND.\"}",
                            HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity("{\"message\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-degree-subject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveDegreeSubject(@Valid @RequestBody DegreeSubjectDTO degreeSubjectDTO) {
        try {

            Optional<DegreeEntity> getByDegreeName = degreesService.getNameDegree(degreeSubjectDTO.getNameDegree());

            if (getByDegreeName.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE NAME OF THE GRADE YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            Optional<SubjectEntity> getBySubjectName = subjectService.getNameSubject(degreeSubjectDTO.getNameSubject());

            if (getBySubjectName.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE NAME OF THE SUBJECT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.BAD_REQUEST);
            }

            String idDegree = getByDegreeName.get().getIdDegree();
            String idSubject = getBySubjectName.get().getIdSubject();

            Optional<DegreeSubjectEntity> getByIdDegreeAndIdSubject
                    = degreeSubjectService.getIdDegreeAndIdSubject(idDegree, idSubject);

            if (!getByIdDegreeAndIdSubject.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID DEGREE AND ID SUBJECT YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                        HttpStatus.BAD_REQUEST);
            }

            DegreeSubjectEntity degreeSubjectEntity = new DegreeSubjectEntity(idDegree, idSubject);
            degreeSubjectEntity.setIdDegSubj(idDegree + "-" + idSubject);
            degreeSubjectService.save(degreeSubjectEntity);

            return new ResponseEntity("{\"message\":\"THE DEEGRE_SUBJECT REGISTRATION WAS SUCCESSFUL.\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-degrees-subjects")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveDegreesSubjects(@Valid @RequestBody List<DegreeSubjectDTO> listDegreeSubjectDTO) {
        try {

            for (DegreeSubjectDTO degreeSubjectDTO : listDegreeSubjectDTO) {
                Optional<DegreeEntity> getByDegreeName = degreesService.getNameDegree(degreeSubjectDTO.getNameDegree());

                if (getByDegreeName.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE NAME '" + degreeSubjectDTO.getNameDegree() + "' OF THE GRADE YOU ARE ENTERING IS NOT REGISTERED.\"}",
                            HttpStatus.NOT_FOUND);
                }

                Optional<SubjectEntity> getBySubjectName = subjectService.getNameSubject(degreeSubjectDTO.getNameSubject());

                if (getBySubjectName.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE NAME '" + degreeSubjectDTO.getNameSubject() + "' OF THE SUBJECT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                            HttpStatus.BAD_REQUEST);
                }

                String idDegree = getByDegreeName.get().getIdDegree();
                String idSubject = getBySubjectName.get().getIdSubject();

                Optional<DegreeSubjectEntity> getByIdDegreeAndIdSubject
                        = degreeSubjectService.getIdDegreeAndIdSubject(idDegree, idSubject);

                if (!getByIdDegreeAndIdSubject.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE ID DEGREE AND ID SUBJECT YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                            HttpStatus.BAD_REQUEST);
                }

                degreeSubjectDTO.setIdDegree(idDegree);
                degreeSubjectDTO.setIdSubject(idSubject);

                DegreeSubjectEntity degreeSubjectEntity = degreeSubjectMapper.toDegreeSubjectEntity(degreeSubjectDTO);
                degreeSubjectEntity.setIdDegSubj(idDegree + "-" + idSubject);
                degreeSubjectService.save(degreeSubjectEntity);

            }

            return new ResponseEntity("{\"message\":\"THE DEEGRE_SUBJECT REGISTRATION WAS SUCCESSFUL.\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }
}
