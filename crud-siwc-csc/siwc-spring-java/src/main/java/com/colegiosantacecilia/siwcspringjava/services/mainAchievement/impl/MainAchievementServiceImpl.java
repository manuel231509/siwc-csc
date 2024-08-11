package com.colegiosantacecilia.siwcspringjava.services.mainAchievement.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.mainAchievement.MainAchievementEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.mainAchievement.MainAchievementRepository;
import com.colegiosantacecilia.siwcspringjava.services.mainAchievement.MainAchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class MainAchievementServiceImpl extends GenericServiceImpl<MainAchievementEntity, Long> implements MainAchievementService {
    @Autowired
    private MainAchievementRepository mainAchievementRepository;

    @Override
    public JpaRepository<MainAchievementEntity, Long> getJpaRepository() {
        return mainAchievementRepository;
    }    
    
}
