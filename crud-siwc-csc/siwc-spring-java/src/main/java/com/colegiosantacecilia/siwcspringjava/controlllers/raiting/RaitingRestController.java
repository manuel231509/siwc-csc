package com.colegiosantacecilia.siwcspringjava.controlllers.raiting;

import com.colegiosantacecilia.siwcspringjava.dto.raiting.RaitingDTO;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.raiting.RaitingMapper;
import com.colegiosantacecilia.siwcspringjava.services.degreeSubject.DegreeSubjectService;
import com.colegiosantacecilia.siwcspringjava.services.period.PeriodService;
import com.colegiosantacecilia.siwcspringjava.services.raiting.RaitingService;
import com.colegiosantacecilia.siwcspringjava.services.student.StudentService;
import com.colegiosantacecilia.siwcspringjava.services.subject.SubjectService;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping(value = "/raiting", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class RaitingRestController {

    @Autowired
    private RaitingService raitingService;

    @Autowired
    private PeriodService periodService;

    @Autowired
    private DegreeSubjectService degreeSubjectService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private RaitingMapper raitingMapper;

    @GetMapping(value = "/all-raiting")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllRaiting() {
        List<?> listRaiting = raitingService.getAll();
        if (!listRaiting.isEmpty()) {
            return new ResponseEntity(listRaiting, HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO RAITINGS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/find-raiting-byId/{raitingId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getByRaitingId(@PathVariable long raitingId) {
        try {
            return raitingService.getById(raitingId)
                    .map(raiting
                            -> new ResponseEntity(raiting, HttpStatus.OK)
                    ).orElse(new ResponseEntity("{\"message\":\"RAITING ID NUMBER WAS NOT FOUND.\"}",
                            HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-raiting")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveRaiting(@Valid @RequestBody RaitingDTO raitingDTO) {
        try {
            Optional<PeriodEntity> pOptional = periodService.getById(raitingDTO.getIdPeriod());
            if (pOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID OF THE PERIOD YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            Optional<DegreeSubjectEntity> dSOptional = degreeSubjectService.getById(raitingDTO.getIdDegSubj());
            if (dSOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID OF THE DEGREE_SUBJECT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            Optional<StudentEntity> sOptional = studentService.getById(raitingDTO.getIdNumberStudent());
            if (sOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID OF THE STUDENT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }
            RaitingEntity raitingEntity = raitingMapper.toRaitingEntity(raitingDTO);
            raitingEntity.setIdRaiting(raitingDTO.getIdPeriod() + "-" + raitingDTO.getIdDegSubj() + "-" + raitingDTO.getIdNumberStudent());
            raitingService.save(raitingEntity);
            return new ResponseEntity("{\"message\":\"THE RAITING REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-raitings")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveRaitings(@Valid @RequestBody List<RaitingDTO> listRaitingDTO) {
        try {
            for (RaitingDTO raitingDTO : listRaitingDTO) {
                Optional<PeriodEntity> pOptional = periodService.getById(raitingDTO.getIdPeriod());
                if (pOptional.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE ID " + raitingDTO.getIdPeriod() + " OF THE PERIOD YOU ARE ENTERING IS NOT REGISTERED.\"}",
                            HttpStatus.NOT_FOUND);
                }

                Optional<DegreeSubjectEntity> dSOptional = degreeSubjectService.getById(raitingDTO.getIdDegSubj());
                if (dSOptional.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE ID " + raitingDTO.getIdDegSubj() + " OF THE DEGREE_SUBJECT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                            HttpStatus.NOT_FOUND);
                }

                Optional<StudentEntity> sOptional = studentService.getById(raitingDTO.getIdNumberStudent());
                if (sOptional.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE ID " + raitingDTO.getIdNumberStudent() + " OF THE STUDENT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                            HttpStatus.NOT_FOUND);
                }

                StudentEntity studentEntity = sOptional.get();
                DegreeSubjectEntity degreeSubjectEntity = dSOptional.get();

                SubjectEntity subjectEntity = subjectService.getById(degreeSubjectEntity.getIdSubject()).get();

                if (!studentEntity.getIdDegree().equals(degreeSubjectEntity.getIdDegree())) {
                    return new ResponseEntity("{\"message\":\"THE " + subjectEntity.getNameSubject() + " COURSE IS NOT ASSIGNED TO THE STUDENT'S CURRENT GRADE.\"}", HttpStatus.NOT_FOUND);
                }

                RaitingEntity raitingEntity = raitingMapper.toRaitingEntity(raitingDTO);
                raitingEntity.setIdRaiting(raitingDTO.getIdPeriod() + "-" + raitingDTO.getIdDegSubj());
                raitingService.save(raitingEntity);
            }
            return new ResponseEntity("{\"message\":\"THE RAITING REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }
}
