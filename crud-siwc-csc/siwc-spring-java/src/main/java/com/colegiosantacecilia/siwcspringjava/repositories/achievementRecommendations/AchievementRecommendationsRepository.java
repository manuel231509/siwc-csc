package com.colegiosantacecilia.siwcspringjava.repositories.achievementRecommendations;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.achievementRecommendations.AchievementRecommendationsEntity;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface AchievementRecommendationsRepository extends GenericRepository<AchievementRecommendationsEntity, Long> {

}
