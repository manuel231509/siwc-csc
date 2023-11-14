package com.colegiosantacecilia.siwcspringjava.repositories.task;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface TaskRepository extends GenericRepository<TaskEntity, String> {

    /**
     *
     * @param taskName
     * @return
     */
    Optional<TaskEntity> findByTaskName(String taskName);

    @Query(nativeQuery = true,
            value = "SELECT t.* "
            + "FROM task t "
            + "		INNER JOIN period_plan pp "
            + "			ON t.id_period_plan = pp.id_period_plan "
            + "         INNER JOIN degree_subject ds "
            + "                 ON ds.id_deg_subj = pp.id_deg_subj "
            + "WHERE ds.id_deg_subj = :idDegSubj "
            + "      AND t.task_name LIKE :taskName")
    List<TaskEntity> findByTaskNameAndIdDegSubj(String idDegSubj, String taskName);

    @Query(nativeQuery = true, value = "SELECT function_assign_task_identification(:idPeriodPlan);")
    Optional<String> functionAssignTaskIdentification(String idPeriodPlan);

    @Query(nativeQuery = true,
            value = "SELECT t.* \n"
            + "FROM student s\n"
            + "		INNER JOIN published_task pt\n"
            + "			ON s.id_number_student = pt.id_number_student\n"
            + "		INNER JOIN task t\n"
            + "			ON t.id_task = pt.id_task\n"
            + "		INNER JOIN period_plan pp\n"
            + "			ON t.id_period_plan = pp.id_period_plan\n"
            + "		INNER JOIN degree_subject ds\n"
            + "			ON pp.id_deg_subj = ds.id_deg_subj\n"
            + "		INNER JOIN period p\n"
            + "			ON pp.id_period = p.id_period\n"
            + "WHERE s.id_number_student=:idNumberStudent\n"
            + "	   AND ds.id_subject=:idSubject\n"
            + "	   AND t.task_deadline IS NOT NULL\n"
            + "	   AND pt.task_delivered <> 1\n"
            + "	   AND p.id_period = (SELECT id_period\n"
            + "			      FROM period \n"
            + "			      WHERE CURDATE() > initial_date\n"
            + "			      ORDER BY period DESC\n"
            + "			      LIMIT 1)\n"
            + "ORDER BY t.task_deadline\n"
            + "LIMIT 3")
    List<TaskEntity> findTasksByIdNumberStudentAndIdSubjectAndCurrentDateLimit3(String idNumberStudent, String idSubject);

    @Query(nativeQuery = true,
            value = "SELECT t.* \n"
            + "FROM student s\n"
            + "		INNER JOIN published_task pt\n"
            + "			ON s.id_number_student = pt.id_number_student\n"
            + "		INNER JOIN task t\n"
            + "			ON t.id_task = pt.id_task\n"
            + "		INNER JOIN period_plan pp\n"
            + "			ON t.id_period_plan = pp.id_period_plan\n"
            + "		INNER JOIN degree_subject ds\n"
            + "			ON pp.id_deg_subj = ds.id_deg_subj\n"
            + "		INNER JOIN period p\n"
            + "			ON pp.id_period = p.id_period\n"
            + "WHERE s.id_number_student=:idNumberStudent\n"
            + "	   AND ds.id_subject=:idSubject\n"
            + "	   AND p.id_period = (SELECT id_period\n"
            + "			      FROM period \n"
            + "			      WHERE CURDATE() > initial_date\n"
            + "			      ORDER BY period DESC\n"
            + "			      LIMIT 1)\n"
            + "ORDER BY t.date_publication_task, t.task_deadline")
    List<TaskEntity> findTasksByIdNumberStudentAndIdSubjectAndCurrentDate(String idNumberStudent, String idSubject);

    @Query(nativeQuery = true,
            value = "SELECT  COUNT(pt.id_task) \n"
            + "FROM student st \n"
            + "		INNER JOIN published_task pt \n"
            + "			ON st.id_number_student = pt.id_number_student\n"
            + "		INNER JOIN task tk\n"
            + "			ON tk.id_task = pt.id_task\n"
            + "		INNER JOIN period_plan pp\n"
            + "			ON tk.id_period_plan = pp.id_period_plan\n"
            + "WHERE st.id_number_student =  :idNumberStudent\n"
            + "      AND pp.id_period = :idPeriod\n"
            + "	  AND pp.id_deg_subj = :idDegSubj\n"
            + "	  AND tk.task_qualification_points <> 0")
    Long countByIdNumberStudentAndIdDegSubjAndIdPeriod(Long idNumberStudent, String idDegSubj, String idPeriod);
    
    @Query(nativeQuery = true,
            value = "SELECT\n"
            + "  ts.*\n"
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
    List<TaskEntity> findTasksByPeriodAndDegreeAndSubjectAndTeacher(String idPeriod, String idDegree, String idSubject, Long idNumberTeacher);
}
