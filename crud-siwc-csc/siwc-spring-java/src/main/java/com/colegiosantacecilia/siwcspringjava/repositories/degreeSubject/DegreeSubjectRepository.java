package com.colegiosantacecilia.siwcspringjava.repositories.degreeSubject;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import java.util.Optional;
import org.springframework.stereotype.*;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface DegreeSubjectRepository extends GenericRepository<DegreeSubjectEntity, String> {

    Optional<DegreeSubjectEntity> findByIdDegreeAndIdSubject(String idDegree, String idSubject);
}
