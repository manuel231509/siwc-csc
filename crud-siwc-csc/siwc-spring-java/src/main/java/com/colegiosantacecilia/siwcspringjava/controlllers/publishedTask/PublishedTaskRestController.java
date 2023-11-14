package com.colegiosantacecilia.siwcspringjava.controlllers.publishedTask;

import com.colegiosantacecilia.siwcspringjava.controlllers.taskFile.*;
import com.colegiosantacecilia.siwcspringjava.controlllers.publishedTask.*;
import com.colegiosantacecilia.siwcspringjava.dto.publishedFile.PublishedFileDTO;
import com.colegiosantacecilia.siwcspringjava.dto.publishedTask.PublishedTaskDTO;
import com.colegiosantacecilia.siwcspringjava.dto.publishedTask.PublishedTaskDTO1;
import com.colegiosantacecilia.siwcspringjava.dto.taskFile.TaskFileDTO;
import com.colegiosantacecilia.siwcspringjava.entities.periodPlan.PeriodPlanEntity;
import com.colegiosantacecilia.siwcspringjava.entities.publishedFile.PublishedFileEntity;
import com.colegiosantacecilia.siwcspringjava.entities.publishedTask.PublishedTaskEntity;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;
import com.colegiosantacecilia.siwcspringjava.entities.taskFile.TaskFileEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.publishedFile.PublishedFileMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.publishedTask.PublishedTaskMapper1;
import com.colegiosantacecilia.siwcspringjava.mapper.taskFile.TaskFileMapper;
import com.colegiosantacecilia.siwcspringjava.services.periodPlan.PeriodPlanService;
import com.colegiosantacecilia.siwcspringjava.services.publishedFile.PublishedFileService;
import com.colegiosantacecilia.siwcspringjava.services.publishedTask.PublishedTaskService;
import com.colegiosantacecilia.siwcspringjava.services.raiting.RaitingService;
import com.colegiosantacecilia.siwcspringjava.services.student.StudentService;
import com.colegiosantacecilia.siwcspringjava.services.task.TaskService;
import com.colegiosantacecilia.siwcspringjava.services.taskFile.TaskFileService;
import java.sql.SQLClientInfoException;
import java.sql.SQLDataException;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.SQLInvalidAuthorizationSpecException;
import java.sql.SQLSyntaxErrorException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sebastian Villamizar
 */
@RestController
@RequestMapping(value = "published-task", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class PublishedTaskRestController {

    @Autowired
    private PublishedTaskService publishedTaskService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private PublishedFileService publishedFileService;

    @Autowired
    private PeriodPlanService periodPlanService;

    @Autowired
    RaitingService raitingService;

    @Autowired
    private PublishedFileMapper publishedFileMapper;

    @Autowired
    private PublishedTaskMapper1 publishedTaskMapper1;

    @GetMapping(value = "all-published-task")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT') or hasRole('TEACHER')")
    public ResponseEntity<?> getAllPublishedTask() {
        List<?> listPublishedTask = publishedTaskService.getAll();
        if (listPublishedTask.isEmpty()) {
            return new ResponseEntity("{\"message\":\"NO PUBLISHED TASK LOGS HAS BEEN FOUND.\"}", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(listPublishedTask, HttpStatus.OK);
    }

    @Transactional(
            rollbackFor = {
                SQLException.class,
                SQLDataException.class,
                SQLIntegrityConstraintViolationException.class,
                SQLClientInfoException.class,
                SQLFeatureNotSupportedException.class,
                SQLInvalidAuthorizationSpecException.class,
                SQLSyntaxErrorException.class})
    @PostMapping(value = "/update-note-comment_teacher")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT') or hasRole('TEACHER')")
    public ResponseEntity<?> updateNoteAndComentTeacher(@Valid @RequestBody PublishedTaskDTO1 publishedTaskDTO) {
        try {
            PublishedTaskEntity publishedTaskEntity = publishedTaskService.getById(publishedTaskDTO.getIdPublishedTask()).get();
            publishedTaskEntity.setTaskNote(publishedTaskDTO.getTaskNote());
            publishedTaskEntity.setTaskTeacherComment(publishedTaskDTO.getTeacherComment());
            publishedTaskEntity.setQualifiedTask(publishedTaskDTO.getQualifiedTask());
            publishedTaskService.save(publishedTaskEntity);

            TaskEntity taskEntity = taskService.getById(publishedTaskEntity.getIdTask()).get();
            PeriodPlanEntity periodPlanEntity = periodPlanService.getById(taskEntity.getIdPeriodPlan()).get();
            RaitingEntity raitingEntity
                    = raitingService.getRaitingByIdNumberStudentAndIdDegSubjAndIdPeriod(
                            publishedTaskEntity.getIdNumberStudent(),
                            periodPlanEntity.getIdDegSubj(),
                            periodPlanEntity.getIdPeriod()).get();
            raitingEntity.setActivitiesNote(raitingEntity.getActivitiesNote() + publishedTaskDTO.getTaskNote());
            raitingService.save(raitingEntity);

            return new ResponseEntity("{\"message\":\"THE REGISTRATION WAS SUCCESSFUL.\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/update-date_delivered-task_delivered")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('STUDENT') OR hasRole('TEACHER')")
    public ResponseEntity<?> updateDateDeliveredAndTaskDelivered(@Valid @RequestBody PublishedTaskDTO1 publishedTaskDTO) {
        try {
            Optional<StudentEntity> sOptional = studentService.getById(publishedTaskDTO.getIdNumberStudent());
            if (sOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID '" + publishedTaskDTO.getIdNumberStudent()
                        + "' OF THE STUDENT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            Optional<TaskEntity> tOptional = taskService.getById(publishedTaskDTO.getIdTask());
            if (tOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID '" + publishedTaskDTO.getIdNumberStudent()
                        + "' OF THE STUDENT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            for (PublishedFileDTO publishedFileDTO : publishedTaskDTO.getPublishedFileDTOs()) {
                publishedFileDTO.setIdPublishedTask(publishedTaskDTO.getIdPublishedTask());
                PublishedFileEntity publishedFileEntity = publishedFileMapper.toPublishedFileEntity(publishedFileDTO);
                publishedFileService.save(publishedFileEntity);
            }

            PublishedTaskEntity publishedTaskEntity = publishedTaskService.getById(publishedTaskDTO.getIdPublishedTask()).get();
            publishedTaskEntity.setDateTaskDelivered(publishedTaskDTO.getDateTaskDelivered());
            publishedTaskEntity.setTaskDelivered(publishedTaskDTO.getDelivered());
            publishedTaskEntity.setTaskStudentComment(publishedTaskDTO.getStudentComment());

            publishedTaskService.save(publishedTaskEntity);
            return new ResponseEntity("{\"message\":\"THE REGISTRATION WAS SUCCESSFUL.\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

}
