package com.colegiosantacecilia.siwcspringjava.services.raiting;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
import java.util.Optional;

/**
 *
 * @author Sebastian Villamizar
 */
public interface RaitingService extends GenericService<RaitingEntity, Long> {

    Optional<RaitingEntity> getRaitingByIdNumberStudentAndIdDegSubjAndIdPeriod(Long idNumberStudent, String idDegSubj, String idPeriod);
}
