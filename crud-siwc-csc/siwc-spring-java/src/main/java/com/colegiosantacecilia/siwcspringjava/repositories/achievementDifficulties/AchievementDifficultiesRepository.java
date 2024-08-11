package com.colegiosantacecilia.siwcspringjava.repositories.achievementDifficulties;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.achievementDifficulties.AchievementDifficultiesEntity;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */

@Repository
public interface AchievementDifficultiesRepository extends GenericRepository<AchievementDifficultiesEntity,Long> {
    
}
