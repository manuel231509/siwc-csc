package com.colegiosantacecilia.siwcspringjava.entities.task;

import com.colegiosantacecilia.siwcspringjava.entities.periodPlan.PeriodPlanEntity;
import com.colegiosantacecilia.siwcspringjava.entities.publishedTask.PublishedTaskEntity;
import com.colegiosantacecilia.siwcspringjava.entities.taskFile.TaskFileEntity;
import java.io.Serializable;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "task")
public class TaskEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_task", length = 500)
    private String idTask;

    @Column(name = "task_name", nullable = false, length = 80)
    private String taskName;

    @Column(name = "task_description", length = 200)
    private String taskDescription;

    @Column(name = "task_qualification_points", nullable = false)
    private Double taskQualificationPoints;

    @Column(name = "date_publication_task", nullable = false)
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date datePublicationTask;

    @Column(name = "task_deadline")
    @Temporal(value = TemporalType.DATE)
    private Date taskDeadLine;

    @Column(name = "task_time_limit")
    @Temporal(value = TemporalType.TIME)
    private Date taskTimeLimit;

    @Column(name = "id_period_plan", nullable = false, length = 500)
    private String idPeriodPlan;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @MapsId(value = "idPeriodPlan")
    @JoinColumn(name = "id_period_plan",
            foreignKey = @ForeignKey(name = "task_period_plan_FK",
                    value = ConstraintMode.CONSTRAINT),
            nullable = false, insertable = false, updatable = false)
    private PeriodPlanEntity periodPlanEntity;

    @OneToMany(mappedBy = "taskEntity",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<TaskFileEntity> taskFileEntitys
            = new LinkedList<>();

    @OneToMany(mappedBy = "taskEntity",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<PublishedTaskEntity> publishedTaskEntitys
            = new LinkedList<>();

    public TaskEntity() {
    }

    public TaskEntity(String idTask, String taskName) {
        this.idTask = idTask;
        this.taskName = taskName;
    }

    public String getIdTask() {
        return idTask;
    }

    public void setIdTask(String idTask) {
        this.idTask = idTask;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public Double getTaskQualificationPoints() {
        return taskQualificationPoints;
    }

    public void setTaskQualificationPoints(Double taskQualificationPoints) {
        this.taskQualificationPoints = taskQualificationPoints;
    }

    public Date getDatePublicationTask() {
        return datePublicationTask;
    }

    public void setDatePublicationTask(Date datePublicationTask) {
        this.datePublicationTask = datePublicationTask;
    }

    public Date getTaskDeadLine() {
        return taskDeadLine;
    }

    public void setTaskDeadLine(Date taskDeadLine) {
        this.taskDeadLine = taskDeadLine;
    }

    public Date getTaskTimeLimit() {
        return taskTimeLimit;
    }

    public void setTaskTimeLimit(Date taskTimeLimit) {
        this.taskTimeLimit = taskTimeLimit;
    }

    public String getIdPeriodPlan() {
        return idPeriodPlan;
    }

    public void setIdPeriodPlan(String idPeriodPlan) {
        this.idPeriodPlan = idPeriodPlan;
    }

    public List<TaskFileEntity> getTaskFileEntitys() {
        return taskFileEntitys;
    }

    public void setTaskFileEntitys(List<TaskFileEntity> taskFileEntitys) {
        this.taskFileEntitys = taskFileEntitys;
    }

    public void addTaskFileEntitys(TaskFileEntity tfe) {
        this.taskFileEntitys.add(tfe);
    }

    public void addAllTaskFileEntitys(List<TaskFileEntity> taskFileEntitys) {
        this.taskFileEntitys.addAll(taskFileEntitys);
    }

    public List<PublishedTaskEntity> getPublishedTaskEntitys() {
        return publishedTaskEntitys;
    }

    public void setPublishedTaskEntitys(List<PublishedTaskEntity> publishedTaskEntitys) {
        this.publishedTaskEntitys = publishedTaskEntitys;
    }

    public void addPublishedTaskEntitys(PublishedTaskEntity pte) {
        this.publishedTaskEntitys.add(pte);
    }

    @Override
    public String toString() {
        return "TaskEntity{"
                + "\nidTask=" + idTask
                + ", \ntaskName=" + taskName
                + ", \ntaskDecription=" + taskDescription
                + ", \ntaskQualificationPoints=" + taskQualificationPoints
                + ", \ndatePublicationTask=" + datePublicationTask
                + ", \ntaskDeadLine=" + taskDeadLine
                + ", \ntaskTimeLimit=" + taskTimeLimit
                + ", \nidPeriodPlan=" + idPeriodPlan
                + ", \nperiodPlanEntity=" + periodPlanEntity
                + ", \ntaskFileEntitys=" + taskFileEntitys
                + ", \npublishedTaskEntitys=" + publishedTaskEntitys
                + '}';
    }

}
