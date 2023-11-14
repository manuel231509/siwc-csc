package com.colegiosantacecilia.siwcspringjava.repositories.subject;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface SubjectRepository extends GenericRepository<SubjectEntity, String> {

    Optional<SubjectEntity> findByNameSubject(String nameSubject);

    @Query(nativeQuery = true, value = "SELECT DISTINCT sbj.* "
            + "FROM teacher tch "
            + "INNER JOIN  subject sbj "
            + "ON tch.id_number_teacher = sbj.id_number_teacher "
            + "INNER JOIN  degree_subject dgr_sbj "
            + "ON sbj.id_subject = dgr_sbj.id_subject "
            + "INNER JOIN  degree dgr "
            + "ON dgr_sbj.id_degree = dgr.id_degree "
            + "WHERE tch.id_number_teacher = :idNumberTeacher "
            + "AND dgr.id_degree = :idDegree "
            + "ORDER BY sbj.name_subject")
    List<SubjectEntity> findSubjectByIdNumberTeacherAndIdDegree(Long idNumberTeacher, String idDegree);

    @Query(nativeQuery = true,
            value = "SELECT sb.* \n"
            + "FROM degree dg \n"
            + "		INNER JOIN degree_subject ds\n"
            + "			ON ds.id_degree = dg.id_degree\n"
            + "		INNER JOIN subject sb\n"
            + "			ON sb.id_subject = ds.id_subject\n"
            + "WHERE dg.id_degree = :idDegree\n"
            + "ORDER BY sb.id_number_teacher, sb.name_subject")
    List<SubjectEntity> findSubjectsByIdDegreeStudent(String idDegree);

    @Query(nativeQuery = true,
            value = "SELECT sb.* \n"
            + "FROM student st \n"
            + "		INNER JOIN degree dg\n"
            + "			ON st.id_degree = dg.id_degree\n"
            + "		INNER JOIN degree_subject ds\n"
            + "			ON dg.id_degree = ds.id_degree\n"
            + "		INNER JOIN subject sb\n"
            + "			ON ds.id_subject = sb.id_subject\n"
            + "WHERE st.id_number_student = :idNumberStudent\n"
            + "GROUP BY 1")
    List<SubjectEntity> getSubjectsByIdStudent(Long idNumberStudent);
}
