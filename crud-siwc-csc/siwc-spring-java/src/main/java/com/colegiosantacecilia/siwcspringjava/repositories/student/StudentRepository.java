package com.colegiosantacecilia.siwcspringjava.repositories.student;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Repository
public interface StudentRepository extends GenericRepository<StudentEntity, Long> {

    Optional<StudentEntity> findByEmailAddressStudent(String emailAddressStudent);

    Optional<StudentEntity> findByIdNumberStudent(Long idNumberStudent);

    Optional<StudentEntity> findByPhoneNumberStudent(String phoneNumberStudent);

    List<StudentEntity> findByIdDegree(String idDegree);

    @Query(nativeQuery = true, value = "SELECT DISTINCT st.* "
            + "FROM teacher tc INNER JOIN subject s "
            + "                   ON s.id_number_teacher = tc.id_number_teacher "
            + "                INNER JOIN degree_subject ds "
            + "                   ON ds.id_subject = s.id_subject "
            + "                INNER JOIN degree d "
            + "                   ON d.id_degree = ds.id_degree "
            + "                INNER JOIN student st "
            + "                   ON st.id_degree = d.id_degree "
            + "WHERE tc.id_number_teacher = :idNumberTeacher "
            + "       AND d.id_degree = :idDegree  "
            + "       AND s.id_subject = :idSubject ")
    List<StudentEntity> findStudentsByTeacherAndDegreeAndSubject(String idDegree, String idSubject, Long idNumberTeacher);

    @Query(nativeQuery = true,
            value = "SELECT DISTINCT st.* \n"
            + "FROM student st \n"
            + "		INNER JOIN published_task pt \n"
            + "			ON st.id_number_student = pt.id_number_student \n"
            + "		INNER JOIN task t \n"
            + "			ON pt.id_task = t.id_task \n"
            + "		INNER JOIN period_plan pp \n"
            + "			ON 	t.id_period_plan = pp.id_period_plan \n"
            + "		INNER JOIN degree_subject ds \n"
            + "			ON pp.id_deg_subj = ds.id_deg_subj \n"
            + "		INNER JOIN subject s \n"
            + "			ON ds.id_subject = s.id_subject \n"
            + "		INNER JOIN teacher th \n"
            + "			ON s.id_number_teacher = th.id_number_teacher \n"
            + "WHERE th.id_number_teacher = :idNumberTeacher \n"
            + "		AND t.id_task= :idTask \n"
            + "        AND pt.task_delivered <> False \n"
            + "        AND pt.date_task_delivered IS NOT NULL")
    List<StudentEntity> findStudentsByTeacherAndTask(Long idNumberTeacher, String idTask);

    @Query(nativeQuery = true,
            value = "SELECT\n"
            + "  st.*\n"
            + "FROM\n"
            + "  student st\n"
            + "  INNER JOIN degree d ON st.id_degree = d.id_degree\n"
            + "  INNER JOIN degree_subject ds ON d.id_degree = ds.id_degree\n"
            + "  INNER JOIN subject s ON ds.id_subject = s.id_subject\n"
            + "  INNER JOIN published_task pt ON st.id_number_student = pt.id_number_student\n"
            + "  INNER JOIN task ts ON pt.id_task = ts.id_task\n"
            + "  INNER JOIN period_plan pp ON ts.id_period_plan = pp.id_period_plan\n"
            + "  AND ds.id_deg_subj = pp.id_deg_subj\n"
            + "WHERE\n"
            + "  s.id_number_teacher = :idNumberTeacher\n"
            + "  AND s.id_subject = :idSubject\n"
            + "  AND d.id_degree = :idDegree\n"
            + "  AND pp.id_period = :idPeriod\n"
            + "  AND ts.task_qualification_points <> 0\n"
            + "GROUP BY\n"
            + "  1")
    List<StudentEntity> findStudentsByPeriodAndDegreeAndSubjectAndTeacher(
            String idPeriod, String idDegree,
            String idSubject, Long idNumberTeacher);

}
