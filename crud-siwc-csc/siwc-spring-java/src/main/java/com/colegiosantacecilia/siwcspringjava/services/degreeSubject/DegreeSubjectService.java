package com.colegiosantacecilia.siwcspringjava.services.degreeSubject;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import java.util.Optional;

/**
 *
 * @author Sebastian Villamizar
 */
public interface DegreeSubjectService extends GenericService<DegreeSubjectEntity, String> {

    Optional<DegreeSubjectEntity> getIdDegreeAndIdSubject(String idDegree, String idSubject);
}
