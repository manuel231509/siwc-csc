package com.colegiosantacecilia.siwcspringjava.services.task;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Sebastian Villamizar
 */
public interface TaskService extends GenericService<TaskEntity, String> {

    /**
     *
     * @param taskName
     * @return
     */
    Optional<TaskEntity> getByTaskName(String taskName);

    List<TaskEntity> getByTaskNameAndIdDegSubj(String idDegSubj, String taskName);

    Optional<String> getIdTask(String idPeriodPlan);

    List<TaskEntity> getTasksByIdNumberStudentAndIdSubjectAndCurrentDate(String idNumberStudent, String idSubject, Boolean boolLimit);

    Long getCountTaskByIdNumberStudentAndIdDegSubjAndIdPeriod(Long idNumberStudent, String idDegSubj, String idPeriod);

    List<TaskEntity> getTasksByPeriodAndDegreeAndSubjectAndTeacher(
            String idPeriod, String idDegree,
            String idSubject, Long idNumberTeacher);
}
