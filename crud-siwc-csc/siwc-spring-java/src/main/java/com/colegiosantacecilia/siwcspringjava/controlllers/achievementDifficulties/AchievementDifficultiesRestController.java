package com.colegiosantacecilia.siwcspringjava.controlllers.achievementDifficulties;

import com.colegiosantacecilia.siwcspringjava.services.achievementDifficulties.AchievementDifficultiesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sebastian Villamizar
 */
@RestController
@RequestMapping(value = "/achievement-difficulties", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class AchievementDifficultiesRestController {

    @Autowired
    private AchievementDifficultiesService achievementDifficultiesService;

    @GetMapping(value = "/all-achievements-difficulties")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllAchievementsDifficulties() {
        List<?> listAchievementDifficulties = achievementDifficultiesService.getAll();
        if (listAchievementDifficulties.isEmpty()) {
            return new ResponseEntity("{\"message\":\"NO ACHIEVEMENTS DIFFICULTIES LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(listAchievementDifficulties, HttpStatus.OK);
    }
}
