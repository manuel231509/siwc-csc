package com.colegiosantacecilia.siwcspringjava.services.task.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import com.colegiosantacecilia.siwcspringjava.repositories.task.TaskRepository;
import com.colegiosantacecilia.siwcspringjava.services.task.TaskService;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class TaskServiceImpl extends GenericServiceImpl<TaskEntity, String> implements TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Override
    public Optional<TaskEntity> getByTaskName(String taskName) {
        return taskRepository.findByTaskName(taskName);
    }
    
    @Override
    public List<TaskEntity> getByTaskNameAndIdDegSubj(String idDegSubj, String taskName) {
        return taskRepository.findByTaskNameAndIdDegSubj(idDegSubj, "%" + taskName);
    }
    
    @Override
    public List<TaskEntity> getTasksByIdNumberStudentAndIdSubjectAndCurrentDate(String idNumberStudent, String idSubject, Boolean boolLimit) {
        return boolLimit ? taskRepository.findTasksByIdNumberStudentAndIdSubjectAndCurrentDateLimit3(idNumberStudent, idSubject) : taskRepository.findTasksByIdNumberStudentAndIdSubjectAndCurrentDate(idNumberStudent, idSubject);
    }
    
    @Override
    public Optional<String> getIdTask(String idPeriodPlan) {
        return taskRepository.functionAssignTaskIdentification(idPeriodPlan);
    }

    @Override
    public Long getCountTaskByIdNumberStudentAndIdDegSubjAndIdPeriod(Long idNumberStudent, String idDegSubj, String idPeriod) {
        return taskRepository.countByIdNumberStudentAndIdDegSubjAndIdPeriod(idNumberStudent, idDegSubj, idPeriod);
    }
    
    @Override
    public List<TaskEntity> getTasksByPeriodAndDegreeAndSubjectAndTeacher(String idPeriod,
            String idDegree, String idSubject, Long idNumberTeacher) {
        return taskRepository.findTasksByPeriodAndDegreeAndSubjectAndTeacher(idPeriod, idDegree, idSubject, idNumberTeacher);
    }
    
    @Override
    public JpaRepository<TaskEntity, String> getJpaRepository() {
        return taskRepository;
    }
    
}
