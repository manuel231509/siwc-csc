package com.colegiosantacecilia.siwcspringjava.services.period.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.period.PeriodRepository;

import com.colegiosantacecilia.siwcspringjava.services.period.PeriodService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class PeriodServiceImpl extends GenericServiceImpl<PeriodEntity, String> implements PeriodService {

    @Autowired
    private PeriodRepository periodRepository;

    @Override
    public Optional<PeriodEntity> getByPeriodName(String periodName, String[] arrayOrdre) {
        Sort dynamicSort = createDynamicSort(arrayOrdre);
        return periodRepository.findByPeriodName(periodName, dynamicSort);
    }
    
    @Override
    public Optional<PeriodEntity> getByPeriodName(String periodName) {
        return periodRepository.findByPeriodName(periodName);
    }

    @Override
    public Optional<PeriodEntity> getPeriodByDateNowSystem() {
        return periodRepository.findPeriodByDateNowSystem();
    }

    @Override
    public Optional<String> getIdPeriod(String periodName) {
        return periodRepository.functionAssignPeriodIdentification(periodName);
    }

    @Override
    public JpaRepository<PeriodEntity, String> getJpaRepository() {
        return periodRepository;
    }

}
