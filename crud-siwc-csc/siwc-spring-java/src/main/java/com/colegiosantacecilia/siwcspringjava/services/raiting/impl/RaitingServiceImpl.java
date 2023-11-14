package com.colegiosantacecilia.siwcspringjava.services.raiting.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.raiting.RaitingRepository;
import com.colegiosantacecilia.siwcspringjava.services.raiting.RaitingService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class RaitingServiceImpl extends GenericServiceImpl<RaitingEntity, Long> implements RaitingService {

    @Autowired
    private RaitingRepository raitingRepository;

    @Override
    public Optional<RaitingEntity> getRaitingByIdNumberStudentAndIdDegSubjAndIdPeriod(Long idNumberStudent, String idDegSubj, String idPeriod) {
        return raitingRepository.findByIdNumberStudentAndIdDegSubjAndIdPeriod(idNumberStudent, idDegSubj, idPeriod);
    }

    @Override
    public JpaRepository<RaitingEntity, Long> getJpaRepository() {
        return raitingRepository;
    }

}
