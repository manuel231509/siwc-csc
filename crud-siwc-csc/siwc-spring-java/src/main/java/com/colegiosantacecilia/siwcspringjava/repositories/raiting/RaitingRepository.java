package com.colegiosantacecilia.siwcspringjava.repositories.raiting;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
import java.util.Optional;
import org.springframework.stereotype.Repository;


/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface RaitingRepository extends GenericRepository<RaitingEntity, Long> {
    Optional<RaitingEntity> findByIdNumberStudentAndIdDegSubjAndIdPeriod(Long idNumberStudent, String idDegSubj, String idPeriod);
}
