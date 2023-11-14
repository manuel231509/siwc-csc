package com.colegiosantacecilia.siwcspringjava.entities.periodPlan;

import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "period_plan",
        uniqueConstraints = {
            @UniqueConstraint(name = "id_period_plan_UK",
                    columnNames = {"id_period", "id_deg_subj","plan_name"})})
public class PeriodPlanEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_period_plan", length = 500)
    private String idPeriodPlan;

    @Column(name = "id_period", nullable = false, length = 200)
    private String idPeriod;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @MapsId("idPeriod")
    @JoinColumn(name = "id_period",
            foreignKey = @ForeignKey(name = "period_plan_period_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private PeriodEntity periodEntity;

    @Column(name = "id_deg_subj", nullable = false, length = 255)
    private String idDegSubj;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @MapsId("idDegSubj")
    @JoinColumn(name = "id_deg_subj",
            foreignKey = @ForeignKey(name = "degree_subject_period_plan_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private DegreeSubjectEntity degreeSubjectEntity;

    @Column(name = "plan_name", nullable = false, length = 50)
    private String planName;

    @OneToMany(mappedBy = "periodPlanEntity",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<TaskEntity> taskEntitys
            = new LinkedList<>();

    public PeriodPlanEntity() {
    }

    public PeriodPlanEntity(String idPeriodPlan, String planName) {
        this.idPeriodPlan = idPeriodPlan;
        this.planName = planName;
    }

    public String getIdPeriodPlan() {
        return idPeriodPlan;
    }

    public void setIdPeriodPlan(String idPeriodPlan) {
        this.idPeriodPlan = idPeriodPlan;
    }

    public String getIdPeriod() {
        return idPeriod;
    }

    public void setIdPeriod(String idPeriod) {
        this.idPeriod = idPeriod;
    }

    public String getIdDegSubj() {
        return idDegSubj;
    }

    public void setIdDegSubj(String idDegSubj) {
        this.idDegSubj = idDegSubj;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public List<TaskEntity> getTaskEntitys() {
        return taskEntitys;
    }

    public void setTaskEntitys(List<TaskEntity> taskEntitys) {
        this.taskEntitys = taskEntitys;
    }

    public void addListTaskEntitys(TaskEntity te) {
        this.taskEntitys.add(te);
    }

    @Override
    public String toString() {
        return "PeriodPlanEntity{"
                + "\nidPeriodPlan=" + idPeriodPlan
                + ", \nidPeriod=" + idPeriod
                + ", \nperiodEntity=" + periodEntity
                + ", \nidDegSubj=" + idDegSubj
                + ", \ndegreeSubjectEntity=" + degreeSubjectEntity
                + ", \nplanName=" + planName
                + ", \ntaskEntitys=" + taskEntitys
                + "\n" + '}';
    }

}
