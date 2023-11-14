package com.colegiosantacecilia.siwcspringjava.services.periodPlan.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.periodPlan.PeriodPlanEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.periodPlan.PeriodPlanRepository;

import com.colegiosantacecilia.siwcspringjava.services.periodPlan.PeriodPlanService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class PeriodPlanServiceImpl extends GenericServiceImpl<PeriodPlanEntity, String> implements PeriodPlanService {

    @Autowired
    private PeriodPlanRepository periodPlanRepository;

    @Override
    public Optional<PeriodPlanEntity> getByIdPeriodAndIdDegSubjAndPlanName(String idPeriod, String idDegSubj, String planName) {
        return periodPlanRepository.findByIdPeriodAndIdDegSubjAndPlanName(idPeriod, idDegSubj, planName);
    }

    @Override
    public Optional<PeriodPlanEntity> getByPlanName(String planName) {
        return periodPlanRepository.findByPlanName(planName);
    }

    @Override
    public Optional<String> getIdPeriodPlan(String idPeriod, String idDegSubj, String planName) {
        return periodPlanRepository.functionAssignPeriodPlanIdentification(idPeriod, idDegSubj, planName);
    }

    @Override
    public List<PeriodPlanEntity> getPeriodPlanByIdPeriodAndIdSubjectAndIdDegree(String idPeriod, String idSubject, String idDegree, Long idNumberTeacher) {
        return periodPlanRepository.findPeriodPlanByIdPeriodAndSubjectAndIdDegree(idPeriod, idSubject, idDegree, idNumberTeacher);
    }
    
    @Override
    public JpaRepository<PeriodPlanEntity, String> getJpaRepository() {
        return periodPlanRepository;
    }

}
