package com.colegiosantacecilia.siwcspringjava.services.achievementDifficulties.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.achievementDifficulties.AchievementDifficultiesEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.achievementDifficulties.AchievementDifficultiesRepository;

import com.colegiosantacecilia.siwcspringjava.services.achievementDifficulties.AchievementDifficultiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class AchievementDifficultiesServiceImpl extends GenericServiceImpl<AchievementDifficultiesEntity, Long> implements AchievementDifficultiesService {

    @Autowired
    private AchievementDifficultiesRepository achievementDifficultiesRepository;
    
    @Override
    public JpaRepository<AchievementDifficultiesEntity, Long> getJpaRepository() {
        return achievementDifficultiesRepository;
    }
    
}
