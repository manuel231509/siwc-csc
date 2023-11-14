package com.colegiosantacecilia.siwcspringjava.dto.task;

import com.colegiosantacecilia.siwcspringjava.dto.periodPlan.PeriodPlanDTO1;
import com.colegiosantacecilia.siwcspringjava.dto.publishedTask.PublishedTaskDTO1;
import com.colegiosantacecilia.siwcspringjava.dto.taskFile.TaskFileDTO;
import java.util.Date;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class TaskDTO1 {

    private String id;

    @NotBlank(message = "THE name FIELD IS REQUIRED.")
    @Size(max = 80, message = "THE name FIELD MUST HAVE A MAXIMUM 80 CHARACTERS.")
    private String name;

    @NotBlank(message = "THE description FIELD IS REQUIRED.")
    @Size(max = 200, message = "THE description FIELD MUST HAVE A MAXIMUM 200 CHARACTERS.")
    private String description;

    @NonNull
    private Double qualificationPoints;

    @NonNull
    private Date datePublicationTask;

    @NonNull
    private Date deadline;

    @NonNull
    private Date timeLimit;

    @Size(max = 500, message = "THE idPeriodPlan FIELD MUST HAVE A MAXIMUM 500 CHARACTERS.")
    private String idPeriodPlan;

    @Valid
    private List<PublishedTaskDTO1> publishedTaskDTO1s;

    @Valid
    private PeriodPlanDTO1 periodPlanDTO1 = null;

    @Valid
    private List<TaskFileDTO> taskFileDTOs;

    public TaskDTO1() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getQualificationPoints() {
        return qualificationPoints;
    }

    public void setQualificationPoints(Double qualificationPoints) {
        this.qualificationPoints = qualificationPoints;
    }

    public Date getDatePublicationTask() {
        return datePublicationTask;
    }

    public void setDatePublicationTask(Date datePublicationTask) {
        this.datePublicationTask = datePublicationTask;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public Date getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(Date timeLimit) {
        this.timeLimit = timeLimit;
    }

    public String getIdPeriodPlan() {
        return idPeriodPlan;
    }

    public void setIdPeriodPlan(String idPeriodPlan) {
        this.idPeriodPlan = idPeriodPlan;
    }

    public List<PublishedTaskDTO1> getPublishedTaskDTOs() {
        return publishedTaskDTO1s;
    }

    public void setPublishedTaskDTOs(List<PublishedTaskDTO1> publishedTaskDTO1s) {
        this.publishedTaskDTO1s = publishedTaskDTO1s;
    }

    public List<TaskFileDTO> getTaskFileDTOs() {
        return taskFileDTOs;
    }

    public void setTaskFileDTOs(List<TaskFileDTO> taskFileDTOs) {
        this.taskFileDTOs = taskFileDTOs;
    }

    public PeriodPlanDTO1 getPeriodPlanDTO1() {
        return periodPlanDTO1;
    }

    public void setPeriodPlanDTO1(PeriodPlanDTO1 periodPlanDTO1) {
        this.periodPlanDTO1 = periodPlanDTO1;
    }

    @Override
    public String toString() {
        return "TaskDTO{"
                + "\nname=" + name
                + ", \ndescription=" + description
                + ", \nqualificationPoints=" + qualificationPoints
                + ", \ndatePublicationTask=" + datePublicationTask
                + ", \ndeadline=" + deadline
                + ", \ntimeLimit=" + timeLimit
                + ", \nidPeriodPlan=" + idPeriodPlan
                + ", \ntaskFileDTOs=" + taskFileDTOs
                + '}';
    }
}
