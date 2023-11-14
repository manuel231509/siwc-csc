package com.colegiosantacecilia.siwcspringjava.controlllers.task;

import com.colegiosantacecilia.siwcspringjava.dto.periodPlan.PeriodPlanDTO1;
import com.colegiosantacecilia.siwcspringjava.dto.publishedTask.PublishedTaskDTO1;
import com.colegiosantacecilia.siwcspringjava.dto.student.StudentDTO;
import com.colegiosantacecilia.siwcspringjava.dto.task.TaskDTO;
import com.colegiosantacecilia.siwcspringjava.dto.task.TaskDTO1;
import com.colegiosantacecilia.siwcspringjava.entities.periodPlan.PeriodPlanEntity;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.periodPlan.PeriodPlanMapper1;
import com.colegiosantacecilia.siwcspringjava.mapper.student.StudentMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.task.TaskMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.task.TaskMapper1;
import com.colegiosantacecilia.siwcspringjava.services.periodPlan.PeriodPlanService;
import com.colegiosantacecilia.siwcspringjava.services.student.StudentService;
import com.colegiosantacecilia.siwcspringjava.services.task.TaskService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sebastian Villamizar
 */
@RestController
@RequestMapping(value = "/task", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class TaskRestController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private PeriodPlanService periodPlanService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private TaskMapper taskMapper;

    @Autowired
    private TaskMapper1 taskMapper1;

    @Autowired
    private PeriodPlanMapper1 periodPlanMapper1;

    @Autowired
    private StudentMapper studentMapper;

    @GetMapping(value = "all-tasks")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllTasks() {
        List<?> listTasks = taskService.getAll();
        if (listTasks.isEmpty()) {
            return new ResponseEntity("{\"message\":\"NO TASKS LOGS HAS BEEN FOUND.\"}", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(listTasks, HttpStatus.OK);
    }

    /**
     *
     * @param taskId
     * @return
     */
    @GetMapping(value = "/find-task-byId/{taskId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getByIdTask(@PathVariable String taskId) {
        try {
            return taskService.getById(taskId)
                    .map(task
                            -> new ResponseEntity(task, HttpStatus.OK))
                    .orElse(new ResponseEntity("{\"message\":\"TASK ID NUMBER WAS NOT FOUND.\"}",
                            HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/find-tasks-byIdNumberStudentAndIdSubjectAndCurrentDate/{idNumberStudent}/{idSubject}/{boolLimit}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public ResponseEntity<?> getTasksByIdNumberStudentAndIdSubjectAndCurrentDate(@PathVariable String idNumberStudent,
            @PathVariable String idSubject, @PathVariable Boolean boolLimit) {
        try {
            List<TaskEntity> taskEntitys = taskService.getTasksByIdNumberStudentAndIdSubjectAndCurrentDate(idNumberStudent, idSubject, boolLimit);
            if (taskEntitys.isEmpty()) {
                return new ResponseEntity("{\"message\":\""
                        + (boolLimit ? "NO RECENTLY ASSIGNED TASKS WERE FOUND."
                                : "NO TASK ASSIGNED FOUND.") + "\"}",
                        HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity(taskEntitys, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "find-tasks-byIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher/{idPeriod}/{idDegree}/{idSubject}/{idNumberTeacher}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<?> getTasksByIdPeriodAndIdDegreeAndIdSubjectAndIdNumberTeacher(
            @Valid @PathVariable String idPeriod, @Valid @PathVariable String idDegree,
            @Valid @PathVariable String idSubject, @Valid @PathVariable Long idNumberTeacher) {

        List<TaskEntity> taskEntitys
                = taskService.getTasksByPeriodAndDegreeAndSubjectAndTeacher(idPeriod, idDegree,
                        idSubject, idNumberTeacher);

        if (taskEntitys.isEmpty()) {
            return new ResponseEntity("{\"message\":\"NO TASKS LOGS HAS BEEN FOUND.\"}", HttpStatus.NOT_FOUND);
        }

        List<TaskDTO1> taskDTO1s
                = taskMapper1.toTaskDTO1s(taskEntitys)
                        .stream()
                        .map(task -> {
                            System.out.println("TASK");
                            PeriodPlanDTO1 periodPlanDTO1
                                    = periodPlanMapper1
                                            .toPeriodPlanDTO1(
                                                    periodPlanService.
                                                            getById(task.getIdPeriodPlan()).get());
                            System.out.println("PeriodPlanDTO1: " + periodPlanDTO1);
                            task.setPeriodPlanDTO1(periodPlanDTO1);
                            List<PublishedTaskDTO1> publishedTaskDTO1s
                                    = task.getPublishedTaskDTOs()
                                            .stream()
                                            .map(publishedTask -> {
                                                StudentDTO studentDTO
                                                        = studentMapper
                                                                .toStudentDTO(
                                                                        studentService
                                                                                .getById(
                                                                                        publishedTask
                                                                                                .getIdNumberStudent()).get());
                                                publishedTask.setStudentDTO(studentDTO);
                                                return publishedTask;
                                            }).collect(Collectors.toList());
                            task.setPublishedTaskDTOs(publishedTaskDTO1s);
                            return task;
                        })
                        .collect(Collectors.toList());

        return new ResponseEntity(taskDTO1s, HttpStatus.OK);
    }

    @PostMapping(value = "save-task")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveTask(@Valid @RequestBody TaskDTO taskDTO) {
        try {

            Optional<TaskEntity> getTaskName = taskService.getByTaskName(taskDTO.getName());
            if (!getTaskName.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE NAME " + taskDTO.getName()
                        + " OF THE TASK YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                        HttpStatus.BAD_REQUEST);
            }

            Optional<PeriodPlanEntity> getById = periodPlanService.getById(taskDTO.getIdPeriodPlan());
            if (getById.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID " + taskDTO.getIdPeriodPlan()
                        + " OF THE PERIOD_PLAN YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }
            TaskEntity taskEntity = taskMapper.toTaskEntity(taskDTO);
            taskService.save(taskEntity);
            return new ResponseEntity("{\"message\":\"THE TASK REGISTRATION WAS SUCCESSFUL.\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

}
