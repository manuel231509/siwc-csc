package com.colegiosantacecilia.siwcspringjava.services.achievementRecommendations.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.achievementRecommendations.AchievementRecommendationsEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.achievementRecommendations.AchievementRecommendationsRepository;

import com.colegiosantacecilia.siwcspringjava.services.achievementRecommendations.AchievementRecommendationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class AchievementRecommendationsServiceImpl extends GenericServiceImpl<AchievementRecommendationsEntity, Long> implements AchievementRecommendationsService {
    @Autowired
    private AchievementRecommendationsRepository achievementRecommendationsRepository;

    @Override
    public JpaRepository<AchievementRecommendationsEntity, Long> getJpaRepository() {
        return achievementRecommendationsRepository;
    }
    
    
}
