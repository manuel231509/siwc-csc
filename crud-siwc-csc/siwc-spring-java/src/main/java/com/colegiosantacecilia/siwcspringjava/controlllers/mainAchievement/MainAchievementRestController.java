package com.colegiosantacecilia.siwcspringjava.controlllers.mainAchievement;

import com.colegiosantacecilia.siwcspringjava.dto.mainAchievement.MainAchievementDTO;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.mainAchievement.MainAchievementEntity;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.mainAchievement.MainAchievementMapper;
import com.colegiosantacecilia.siwcspringjava.services.degreeSubject.DegreeSubjectService;
import com.colegiosantacecilia.siwcspringjava.services.mainAchievement.MainAchievementService;
import com.colegiosantacecilia.siwcspringjava.services.period.PeriodService;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sebastian Villamizar
 */
@RestController
@RequestMapping(value = "/main-achievement", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class MainAchievementRestController {

    @Autowired
    private MainAchievementService mainAchievementService;

    @Autowired
    private MainAchievementMapper mainAchievementMapper;

    @Autowired
    private DegreeSubjectService degreeSubjectService;

    @Autowired
    private PeriodService periodService;

    @GetMapping(value = "/all-main-achievements")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllMainAchievements() {
        List<?> listMainAchievements = mainAchievementService.getAll();
        if (listMainAchievements.isEmpty()) {
            return new ResponseEntity("{\"message\":\"NO MAIN ACHIEVEMENTS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(listMainAchievements, HttpStatus.OK);
    }

    @PostMapping(value = "/save-main-achievement")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveMainAchievement(@Valid @RequestBody MainAchievementDTO mainAchievementDTO) {
        try {
            Optional<DegreeSubjectEntity> dsOptional = degreeSubjectService.getById(mainAchievementDTO.getIdDegSubj());
            if (dsOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE DEGSUBJ YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            Optional<PeriodEntity> pOptional = periodService.getById(mainAchievementDTO.getIdPeriod());
            if (pOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE PERIOD YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            MainAchievementEntity mainAchievementEntity = mainAchievementMapper.toMainAchievementEntity(mainAchievementDTO);

            mainAchievementService.save(mainAchievementEntity);

            return new ResponseEntity("{\"message\":\"THE MAIN ACHIEVEMENT REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
