package com.colegiosantacecilia.siwcspringjava.services.periodPlan;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.entities.periodPlan.PeriodPlanEntity;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Sebsatian Villamizar
 */
public interface PeriodPlanService extends GenericService<PeriodPlanEntity, String> {

    /**
     *
     * @param idPeriod
     * @param idDegSubj
     * @param planName
     * @return
     */
    Optional<PeriodPlanEntity> getByIdPeriodAndIdDegSubjAndPlanName(String idPeriod, String idDegSubj, String planName);

    /**
     *
     * @param planName
     * @return
     */
    Optional<PeriodPlanEntity> getByPlanName(String planName);

    /**
     *
     * @param idPeriod
     * @param idDegSubj
     * @param planName
     * @return
     */
    Optional<String> getIdPeriodPlan(String idPeriod, String idDegSubj, String planName);

    List<PeriodPlanEntity> getPeriodPlanByIdPeriodAndIdSubjectAndIdDegree(String idPeriod,
            String idSubject, String idDegree, Long idNumberTeacher);
}
