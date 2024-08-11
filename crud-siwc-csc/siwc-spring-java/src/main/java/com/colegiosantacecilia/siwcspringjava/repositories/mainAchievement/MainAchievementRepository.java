package com.colegiosantacecilia.siwcspringjava.repositories.mainAchievement;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.mainAchievement.MainAchievementEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface MainAchievementRepository extends GenericRepository<MainAchievementEntity, Long> {
    
}
