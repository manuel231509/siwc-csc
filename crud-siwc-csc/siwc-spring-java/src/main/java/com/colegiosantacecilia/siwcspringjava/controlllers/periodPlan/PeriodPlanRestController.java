package com.colegiosantacecilia.siwcspringjava.controlllers.periodPlan;

import com.colegiosantacecilia.siwcspringjava.dto.periodPlan.PeriodPlanDTO;
import com.colegiosantacecilia.siwcspringjava.dto.publishedTask.PublishedTaskDTO;
import com.colegiosantacecilia.siwcspringjava.dto.taskFile.TaskFileDTO;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import com.colegiosantacecilia.siwcspringjava.entities.periodPlan.PeriodPlanEntity;
import com.colegiosantacecilia.siwcspringjava.entities.publishedTask.PublishedTaskEntity;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;
import com.colegiosantacecilia.siwcspringjava.entities.taskFile.TaskFileEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.periodPlan.PeriodPlanMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.publishedTask.PublishedTaskMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.task.TaskMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.taskFile.TaskFileMapper;
import com.colegiosantacecilia.siwcspringjava.services.degreeSubject.DegreeSubjectService;
import com.colegiosantacecilia.siwcspringjava.services.period.PeriodService;
import com.colegiosantacecilia.siwcspringjava.services.periodPlan.PeriodPlanService;
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
@RequestMapping(value = "/period-plan", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class PeriodPlanRestController {

    @Autowired
    private PeriodPlanService periodPlanService;

    @Autowired
    private PeriodService periodService;

    @Autowired
    private DegreeSubjectService degreeSubjectService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskFileService taskFileService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private RaitingService raitingService;

    @Autowired
    private PeriodPlanMapper periodPlanMapper;

    @Autowired
    private TaskMapper taskMapper;

    @Autowired
    private PublishedTaskMapper publishedTaskMapper;

    @Autowired
    private TaskFileMapper taskFileMapper;

    @GetMapping(value = "/all-periods-plans")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllPeriodsPlans() {
        List<?> listPeriodPlan = periodPlanService.getAll();
        if (listPeriodPlan.isEmpty()) {
            return new ResponseEntity("{\"message\":\"NO PERIODS_PLANS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(listPeriodPlan, HttpStatus.OK);
    }

    @GetMapping(value = "/find-period-plan-byId/{periodPlanId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getByIdPeriodPlan(@PathVariable String periodPlanId) {
        try {
            return periodPlanService.getById(periodPlanId)
                    .map(periodPlan -> new ResponseEntity(periodPlan, HttpStatus.OK))
                    .orElse(new ResponseEntity("{\"message\":\"PERIOD_PLAN ID NUMBER WAS NOT FOUND.\"}",
                            HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/find-periods-plans-byIdPeriodAndSubjectAndDegree/{idPeriod}/{idSubject}/{idDegree}/{idNumberTeacher}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('TEACHER')")
    public ResponseEntity<?> getPeriodPlanByIdPeriodAndSubectAndDegree(@PathVariable String idPeriod,
            @PathVariable String idSubject, @PathVariable String idDegree, @PathVariable Long idNumberTeacher) {
        try {
            List<PeriodPlanEntity> periodPlanEntitys = periodPlanService
                    .getPeriodPlanByIdPeriodAndIdSubjectAndIdDegree(idPeriod, idSubject, idDegree, idNumberTeacher);
            if (periodPlanEntitys.isEmpty()) {
                return new ResponseEntity("{\"message\":\"NO PLANS LOGS HAS BEEN FOUND.\"}", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity(periodPlanEntitys, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"message\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping(value = "/save-period-plan")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> savePeriodPlan(@Valid @RequestBody PeriodPlanDTO periodPlanDTO) {
        try {
            Optional<PeriodEntity> pOptional = periodService.getById(periodPlanDTO.getIdPeriod());
            if (pOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID " + periodPlanDTO.getIdPeriod()
                        + " OF THE PERIOD YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            Optional<DegreeSubjectEntity> dsOptional = degreeSubjectService.getById(periodPlanDTO.getIdDegSubj());
            if (dsOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID " + periodPlanDTO.getIdDegSubj()
                        + " OF THE DEGREE_SUBJECT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            Optional<PeriodPlanEntity> getPlanName = periodPlanService.getByPlanName(periodPlanDTO.getPlanName());
            if (!getPlanName.isEmpty()) {
                return new ResponseEntity(
                        "{\"message\":\"THE NAME OF THE PLAN YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                        HttpStatus.BAD_REQUEST);
            }

            PeriodPlanEntity periodPlanEntity = periodPlanMapper.toPeriodPlanEntity(periodPlanDTO);
            periodPlanEntity.setIdPeriodPlan(periodPlanService.getIdPeriodPlan(periodPlanDTO.getIdPeriod(),
                    periodPlanDTO.getIdDegSubj(), periodPlanDTO.getPlanName()).get());

            periodPlanService.save(periodPlanEntity);
            return new ResponseEntity("{\"message\":\"THE PERIOD_PLAN REGISTRATION WAS SUCCESSFUL.\"}", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("{\"message\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional(
            rollbackFor = {
                SQLException.class,
                SQLDataException.class,
                SQLIntegrityConstraintViolationException.class,
                SQLClientInfoException.class,
                SQLFeatureNotSupportedException.class,
                SQLInvalidAuthorizationSpecException.class})
    @PostMapping(value = "/save-period-plan-task")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('TEACHER')")
    public ResponseEntity<?> savePeriodPlanTask(@Valid @RequestBody PeriodPlanDTO periodPlanDTO) {
        try {

            Optional<PeriodEntity> pOptional = periodService.getById(periodPlanDTO.getIdPeriod());
            if (pOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID '" + periodPlanDTO.getIdPeriod()
                        + "' OF THE PERIOD YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            Optional<DegreeSubjectEntity> dsOptional = degreeSubjectService.getById(periodPlanDTO.getIdDegSubj());
            if (dsOptional.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE ID '" + periodPlanDTO.getIdDegSubj()
                        + "' OF THE DEGREE_SUBJECT YOU ARE ENTERING IS NOT REGISTERED.\"}",
                        HttpStatus.NOT_FOUND);
            }

            PeriodPlanEntity periodPlanEntity = periodPlanMapper.toPeriodPlanEntity(periodPlanDTO);

            String idPeriodPlan = "";

            idPeriodPlan = periodPlanService.getIdPeriodPlan(periodPlanDTO.getIdPeriod(),
                    periodPlanDTO.getIdDegSubj(), periodPlanDTO.getPlanName()).get();

            String idTask = taskService.getIdTask(idPeriodPlan).get();

            periodPlanEntity.setIdPeriodPlan(idPeriodPlan);

            List<TaskEntity> getTaskNamEntitys = taskService.getByTaskNameAndIdDegSubj(periodPlanDTO.getIdDegSubj(),
                    periodPlanDTO.getTaskDTO().getName());
            if (!getTaskNamEntitys.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE NAME '" + periodPlanDTO.getTaskDTO().getName()
                        + "' OF THE TASK YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                        HttpStatus.BAD_REQUEST);
            }

            periodPlanDTO.getTaskDTO().setIdPeriodPlan(idPeriodPlan);
            TaskEntity taskEntity = taskMapper.toTaskEntity(periodPlanDTO.getTaskDTO());
            taskEntity.setIdTask(idTask);

            for (PublishedTaskDTO publishedTaskDTO : periodPlanDTO.getTaskDTO().getPublishedTaskDTOs()) {
                publishedTaskDTO
                        .setIdPublishedTask(idTask + "_" + String.valueOf(publishedTaskDTO.getIdNumberStudent()));
                publishedTaskDTO.setIdTask(idTask);
                Optional<StudentEntity> seOptional = studentService.getById(publishedTaskDTO.getIdNumberStudent());
                if (seOptional.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"STUDENT ID NUMBER WAS NOT FOUND.\"}", HttpStatus.OK);
                }
                PublishedTaskEntity pte = publishedTaskMapper.toPublishedTaskEntity(publishedTaskDTO);
                taskEntity.addPublishedTaskEntitys(pte);
            }

            for (TaskFileDTO taskFileDTO : periodPlanDTO.getTaskDTO().getTaskFileDTOs()) {
                taskFileDTO.setIdTask(idTask);
                TaskFileEntity taskFileEntity = taskFileMapper.toTaskFileEntity(taskFileDTO);
                taskEntity.addTaskFileEntitys(taskFileEntity);
            }

            periodPlanEntity.addListTaskEntitys(taskEntity);

            periodPlanService.save(periodPlanEntity);

            for (PublishedTaskDTO publishedTaskDTO : periodPlanDTO.getTaskDTO().getPublishedTaskDTOs()) {
                Optional<RaitingEntity> rOptional
                        = raitingService.getRaitingByIdNumberStudentAndIdDegSubjAndIdPeriod(
                                publishedTaskDTO.getIdNumberStudent(),
                                periodPlanDTO.getIdDegSubj(),
                                periodPlanDTO.getIdPeriod());
                if (rOptional.isEmpty()) {
                    return new ResponseEntity("{\"message\":"
                            + "\"NO GRADE RECORD WAS FOUND FOR THE PERIODS WITH THE STUDENT'S IDENTIFICATION ("
                            + publishedTaskDTO.getIdNumberStudent()
                            + ").\"}", HttpStatus.NOT_FOUND);
                }
                RaitingEntity raitingEntity = rOptional.get();
                Long amountActivities
                        = taskService.getCountTaskByIdNumberStudentAndIdDegSubjAndIdPeriod(
                                publishedTaskDTO.getIdNumberStudent(),
                                periodPlanDTO.getIdDegSubj(),
                                periodPlanDTO.getIdPeriod());
                raitingEntity.setAmountActivities(amountActivities);

                raitingService.save(raitingEntity);
            }

            return new ResponseEntity("{\"message\":\"THE REGISTRATION WAS SUCCESSFUL.\"}", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }
}
