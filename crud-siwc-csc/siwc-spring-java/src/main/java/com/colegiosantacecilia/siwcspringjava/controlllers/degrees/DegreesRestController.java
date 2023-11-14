package com.colegiosantacecilia.siwcspringjava.controlllers.degrees;

import com.colegiosantacecilia.siwcspringjava.dto.degree.DegreeDTO;
import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.degree.DegreeMapper;
import com.colegiosantacecilia.siwcspringjava.services.degrees.DegreesService;
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
@RequestMapping(value = "/degree", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class DegreesRestController {

    @Autowired
    private DegreesService degreesService;

    @Autowired
    private DegreeMapper degreeMapper;

    @GetMapping(value = "all-degree")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllDegrees() {
        List<?> listDegrees = degreesService.getAll();
        if (!listDegrees.isEmpty()) {
            return new ResponseEntity(listDegrees, HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO DEGREES LOGS HAS BEEN FOUND\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/find-degree-byId/{degreeId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER') or hasRole('STUDENT')")
    public ResponseEntity<?> getByIdDegrees(@PathVariable String degreeId) {
        return degreesService.getById(degreeId)
                .map(degree
                        -> new ResponseEntity(degree,
                        HttpStatus.OK))
                .orElse(new ResponseEntity("{\"message\":\"DEGREE ID NUMBER WAS NOT FOUND.\"}",
                        HttpStatus.NOT_FOUND));
    }

    @PostMapping(value = "/save-degree")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveDegree(@Valid @RequestBody DegreeDTO degreeDTO) {
        try {
            Optional<DegreeEntity> getByNameDegree = degreesService.getNameDegree(degreeDTO.getName());
            if (!getByNameDegree.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE NAME DEGREE YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                        HttpStatus.BAD_REQUEST);
            }
            DegreeEntity degreeEntity = degreeMapper.toDegreeEntity(degreeDTO);
            degreesService.save(degreeEntity);
            return new ResponseEntity("{\"message\":\"THE DEGREE REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-degrees")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveDegrees(@Valid @RequestBody List<DegreeDTO> listDegreeDTO) {
        try {
            for (DegreeDTO degreeDTO : listDegreeDTO) {
                Optional<DegreeEntity> getByNameDegree = degreesService.getNameDegree(degreeDTO.getName());
                if (!getByNameDegree.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE NAME DEGREE YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                            HttpStatus.BAD_REQUEST);
                }
                DegreeEntity degreeEntity = degreeMapper.toDegreeEntity(degreeDTO);
                degreeEntity.setIdDegree(degreesService.getIdDegree(degreeDTO.getName()).get());
                degreesService.save(degreeEntity);
            }
            return new ResponseEntity("{\"message\":\"THE DEGREE REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
