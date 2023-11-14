package com.colegiosantacecilia.siwcspringjava.repositories.periodPlan;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.periodPlan.PeriodPlanEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface PeriodPlanRepository extends GenericRepository<PeriodPlanEntity, String> {

    /**
     *
     * @param idPeriod
     * @param idDegSubj
     * @param planName
     * @return
     */
    Optional<PeriodPlanEntity> findByIdPeriodAndIdDegSubjAndPlanName(String idPeriod, String idDegSubj, String planName);
    
    /**
     *
     * @param planName
     * @return
     */
    Optional<PeriodPlanEntity> findByPlanName(String planName);

    /**
     *
     * @param idPeriod
     * @param idDegSubj
     * @param planName
     * @return
     */
    @Query(nativeQuery = true, value = "SELECT function_assign_period_plan_identification(:idPeriod, :idDegSubj, :planName)")
    Optional<String> functionAssignPeriodPlanIdentification(String idPeriod, String idDegSubj, String planName);
    
    @Query(nativeQuery = true, 
            value = "SELECT DISTINCT pp.* " +
                    "FROM task t INNER JOIN period_plan pp  " +
                    "   		ON t.id_period_plan = pp.id_period_plan " +
                    "   	 INNER JOIN period p " +
                    "   		ON pp.id_period = p.id_period " +
                    "            INNER JOIN degree_subject ds " +
                    "   		ON ds.id_deg_subj = pp.id_deg_subj " +
                    "            INNER JOIN subject s " +
		    "                   ON s.id_subject = ds.id_subject " +
		    "            INNER JOIN teacher tc " +
                    "                   ON s.id_number_teacher = tc.id_number_teacher " +
                    "WHERE p.id_period = :idPeriod " +
                    "       AND ds.id_subject = :idSubject " +
                    "       AND ds.id_degree = :idDegree "+
                    "       AND tc.id_number_teacher = :idNumberTeacher")
    List<PeriodPlanEntity> findPeriodPlanByIdPeriodAndSubjectAndIdDegree(String idPeriod, 
            String idSubject, String idDegree, Long idNumberTeacher);
}
