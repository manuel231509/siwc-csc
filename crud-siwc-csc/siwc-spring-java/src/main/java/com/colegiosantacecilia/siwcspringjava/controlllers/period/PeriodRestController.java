package com.colegiosantacecilia.siwcspringjava.controlllers.period;

import com.colegiosantacecilia.siwcspringjava.dto.period.PeriodDTO;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.period.PeriodMapper;
import com.colegiosantacecilia.siwcspringjava.services.period.PeriodService;
import java.beans.PropertyDescriptor;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
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
@RequestMapping(value = "/period", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
@Validated
public class PeriodRestController {

    @Autowired
    private PeriodService periodService;

    @Autowired
    private PeriodMapper periodMapper;

    @GetMapping(value = "/all-periods")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER') or hasRole('STUDENT')")
    public ResponseEntity<?> getAllPeriods() {
        List<?> listPeriods = periodService.getAll();
        System.out.println("hola cambikos");
        if (!listPeriods.isEmpty()) {
            return new ResponseEntity(listPeriods, HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO PERIODS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/all-periods-sort")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER') or hasRole('STUDENT')")
    public ResponseEntity<?> getAllPeriodsSort(@RequestBody String[] arrayOrdre) {
        Sort dynamicSort = periodService.createDynamicSort(arrayOrdre);
        List<?> listPeriods = periodService.getAll(dynamicSort);
        if (!listPeriods.isEmpty()) {
            return new ResponseEntity(listPeriods, HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO PERIODS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/find-periods-byId/{periodId}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('TEACHER')")
    public ResponseEntity<?> getByIdPeriod(@PathVariable String periodId) {
        try {
            return periodService.getById(periodId)
                    .map(period
                            -> new ResponseEntity(period,
                            HttpStatus.OK)
                    ).orElse(new ResponseEntity("{\"message\":\"PERIOD ID NUMBER WAS NOT FOUND.\"}",
                            HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity("{\"message\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "find-period-byDateNowSystem")
    @PreAuthorize("hasRole('TEACHER') OR hasRole('ADMIN') or hasRole('STUDENT')")
    public ResponseEntity<?> getPeriodByDateNowSystem() {
        try {
            System.out.println("rest period ***");
            return periodService.getPeriodByDateNowSystem().
                    map(period -> new ResponseEntity(period, HttpStatus.OK)).
                    orElse(new ResponseEntity("{\"message\":\"PERIOD BY DATE NOW SYSTEM WAS NOT FOUND.\"}",
                            HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity("{\"message\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-period")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> savePeriod(@Valid @RequestBody PeriodDTO periodDTO) {
        try {
            Optional<PeriodEntity> getByNameRole = periodService.getByPeriodName(periodDTO.getName());
            if (!getByNameRole.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE PERIOD NAME YOU ARE TYPING IS ALREADY REGISTERED.",
                        HttpStatus.BAD_REQUEST);
            }
            PeriodEntity periodEntity = periodMapper.toPeriodEntity(periodDTO);
            periodService.save(periodEntity);
            return new ResponseEntity("{\"message\":\"THE PERIOD REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-periods")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> savePeriods(@Valid @RequestBody List<PeriodDTO> listPeriodDTO) {
        try {
            for (PeriodDTO periodDTO : listPeriodDTO) {
                Optional<PeriodEntity> getByNameRole = periodService.getByPeriodName(periodDTO.getName());
                if (!getByNameRole.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE PERIOD NAME YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                            HttpStatus.BAD_REQUEST);
                }
                PeriodEntity periodEntity = periodMapper.toPeriodEntity(periodDTO);
                periodEntity.setIdPeriod(periodService.getIdPeriod(periodDTO.getName()).get());
                periodService.save(periodEntity);
            }
            return new ResponseEntity("{\"message\":\"THE PERIOD REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/update-period")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePeriod(@Valid @RequestBody PeriodDTO periodDTO) {
        try {
            Optional<PeriodEntity> getByPeriodName = periodService.getByPeriodName(periodDTO.getName());
            if (getByPeriodName.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE PERIOD NAME YOU ARE TYPING IS NOT REGISTERED.",
                        HttpStatus.BAD_REQUEST);
            }
            PeriodEntity existingEntity = getByPeriodName.get();
            PeriodEntity updatePeriodEntity = periodMapper.toPeriodEntity(periodDTO);
            findDifferences(existingEntity, updatePeriodEntity);
            periodService.save(existingEntity);
            return new ResponseEntity("{\"message\":\"THE PERIOD WAS SUCCESSFULLY UPDATED.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/update-periods")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePeriods(@Valid @RequestBody List<PeriodDTO> periodDTOs) {
        try {
            for (PeriodDTO periodDTO : periodDTOs) {
                Optional<PeriodEntity> getByPeriodName = periodService.getByPeriodName(periodDTO.getName());
                if (getByPeriodName.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE PERIOD NAME YOU ARE TYPING IS NOT REGISTERED.",
                            HttpStatus.BAD_REQUEST);
                }
                PeriodEntity existingEntity = getByPeriodName.get();
                PeriodEntity updatePeriodEntity = periodMapper.toPeriodEntity(periodDTO);
                findDifferences(existingEntity, updatePeriodEntity);
                periodService.save(existingEntity);
            }
            return new ResponseEntity("{\"message\":\"THE PERIOD WAS SUCCESSFULLY UPDATED.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    private void findDifferences(PeriodEntity existingEntity, PeriodEntity updatedEntity) {
        BeanWrapper existingWrapper = new BeanWrapperImpl(existingEntity);
        BeanWrapper updatedWrapper = new BeanWrapperImpl(updatedEntity);

        for (PropertyDescriptor propertyDescriptor : existingWrapper.getPropertyDescriptors()) {
            String propertyName = propertyDescriptor.getName();
            Object existingValue = existingWrapper.getPropertyValue(propertyName);
            Object updatedValue = updatedWrapper.getPropertyValue(propertyName);
            if (!propertyName.equals("class")) {
                if (existingValue != null
                        && updatedValue != null
                        && getObjectLength(updatedValue) != 0
                        && !existingValue.equals(updatedValue)) {
                    System.out.println("DIFERENTE - " + propertyName + " - " + updatedValue);
                    existingEntity.setPropertyValue(propertyName, updatedValue);
                } else if (updatedValue != null
                        && getObjectLength(updatedValue) != 0
                        && !updatedValue.equals(existingValue)) {
                    System.out.println("DIFERENTE ELSE - " + propertyName + " - " + updatedValue);
                    existingEntity.setPropertyValue(propertyName, updatedValue);
                }
            }
        }
    }

    private static int getObjectLength(Object obj) {
        if (obj instanceof String) {
            return ((String) obj).length();
        } else if (obj instanceof Collection) {
            return ((Collection<?>) obj).size();
        } else if (obj instanceof Object[]) {
            return ((Object[]) obj).length;
        } else {
            return -1; // Valor por defecto para casos donde no se puede obtener la longitud
        }
    }

}
