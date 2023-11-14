package com.colegiosantacecilia.siwcspringjava.repositories.degrees;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface DegreesRepository extends GenericRepository<DegreeEntity, String> {

    Optional<DegreeEntity> findByNameDegree(String nameDegree);

    @Query(nativeQuery = true, value = "SELECT function_assign_degree_identification(:name_degree);")
    Optional<String> functionAssignDegreeIdentification(String name_degree);

    @Query(nativeQuery = true, value = "SELECT dgr.* "
            + "FROM teacher tch "
            + "INNER JOIN subject sbj "
            + "ON tch.id_number_teacher = sbj.id_number_teacher "
            + "INNER JOIN degree_subject dgr_sbj "
            + "ON sbj.id_subject = dgr_sbj.id_subject "
            + "INNER JOIN degree dgr "
            + "ON dgr_sbj.id_degree = dgr.id_degree "
            + "WHERE tch.id_number_teacher = :id_number_teacher "
            + "GROUP BY dgr.id_degree "
            + "ORDER BY CAST(SUBSTR(dgr.id_degree, 2,LENGTH(dgr.id_degree)) AS UNSIGNED)")
    List<DegreeEntity> gradesAccordingTeacher(Long id_number_teacher);

}
