package com.colegiosantacecilia.siwcspringjava.repositories.period;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface PeriodRepository extends GenericRepository<PeriodEntity, String> {

    Optional<PeriodEntity> findByPeriodName(String periodName);

    Optional<PeriodEntity> findByPeriodName(String periodName, Sort sort);

    @Query(nativeQuery = true, value = "SELECT function_assign_period_identification(:period_name);")
    Optional<String> functionAssignPeriodIdentification(String period_name);

    @Query(nativeQuery = true,
            value = "SELECT *\n"
                    + "FROM period \n"
                    + "WHERE CURDATE() > initial_date\n"
                    + "ORDER BY period DESC\n"
                    + "LIMIT 1")
    Optional<PeriodEntity> findPeriodByDateNowSystem();
}
