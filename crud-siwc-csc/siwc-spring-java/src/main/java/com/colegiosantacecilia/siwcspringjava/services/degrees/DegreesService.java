package com.colegiosantacecilia.siwcspringjava.services.degrees;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Sebastian Villamizar
 */
public interface DegreesService extends GenericService<DegreeEntity, String> {

    Optional<DegreeEntity> getNameDegree(String nameDegree);

    Optional<String> getIdDegree(String name_degree);

    List<DegreeEntity> getDegreeAccordingToTeacher(Long id_number_teacher);
}
