package com.colegiosantacecilia.siwcspringjava.services.period;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import java.util.Optional;

/**
 *
 * @author Sebastian Villamizar
 */
public interface PeriodService extends GenericService<PeriodEntity, String> {

    /**
     *
     * @param periodName
     * @return
     */
    Optional<PeriodEntity> getByPeriodName(String periodName);
    
    /**
     *
     * @param periodName
     * @param arrayOrdre
     * @return
     */
    Optional<PeriodEntity> getByPeriodName(String periodName, String[] arrayOrdre);
    
    /**
     *
     * @param periodName
     * @return
     */
    Optional<String> getIdPeriod(String periodName);
    
    /**
     *
     * @return
     */
    Optional<PeriodEntity> getPeriodByDateNowSystem();
}
