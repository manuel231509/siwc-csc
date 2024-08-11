package com.colegiosantacecilia.siwcspringjava.controlllers.achievementRecommendations;

import com.colegiosantacecilia.siwcspringjava.services.achievementRecommendations.AchievementRecommendationsService;
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
@RequestMapping(value = "/achievement-recommendations",produces = "application/json")
@CrossOrigin(value = "${origins}",allowCredentials = "true")
public class AchievementRecommendationsController {
    
    @Autowired
    private AchievementRecommendationsService achievementRecommendationsService;
    
    @GetMapping(value = "/all-achievements-recommendations")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllAchievementsRecommendations() {
        List<?> listAchievementRecommendations = achievementRecommendationsService.getAll();
        if (listAchievementRecommendations.isEmpty()) {
            return new ResponseEntity("{\"message\":\"NO ACHIEVEMENTS RECOMMENDATIONS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(listAchievementRecommendations, HttpStatus.OK);
    }    
}
