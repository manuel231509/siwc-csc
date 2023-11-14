package com.colegiosantacecilia.siwcspringjava.entities.raiting;

import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "raiting",
        uniqueConstraints = {
            @UniqueConstraint(name = "id_period_student_subject_UK",
                    columnNames = {"id_period", "id_deg_subj", "id_number_student"})
        })
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class RaitingEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_raiting", length = 255)
    private String idRaiting;

    @Column(name = "activities_note", nullable = false)
    private Double activitiesNote;

    @Column(name = "bimonthly_note", nullable = false)
    private Double bimonthlyNote;

    @Column(name = "number_activities", nullable = false)
    private Long amountActivities;

    @Column(name = "id_period", nullable = false, length = 200)
    private String idPeriod;

    @Column(name = "id_deg_subj", nullable = false, length = 255)
    private String idDegSubj;

    @Column(name = "id_number_student", nullable = false)
    private Long idNumberStudent;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    @MapsId("idPeriod")
    @JoinColumn(name = "id_period",
            foreignKey = @ForeignKey(name = "raiting_period_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private PeriodEntity periodEntity;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    @MapsId("idDegSubj")
    @JoinColumn(name = "id_deg_subj",
            foreignKey = @ForeignKey(name = "degree_subject_raiting_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private DegreeSubjectEntity degreeSubjectEntity;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    @MapsId("idNumberStudent")
    @JoinColumn(name = "id_number_student",
            foreignKey = @ForeignKey(name = "student_raiting_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private StudentEntity studentEntity;

    public RaitingEntity() {
    }

    public String getIdRaiting() {
        return idRaiting;
    }

    public void setIdRaiting(String idRaiting) {
        this.idRaiting = idRaiting;
    }

    public Double getActivitiesNote() {
        return activitiesNote;
    }

    public void setActivitiesNote(Double activitiesNote) {
        this.activitiesNote = activitiesNote;
    }

    public Double getBimonthlyNote() {
        return bimonthlyNote;
    }

    public void setBimonthlyNote(Double bimonthlyNote) {
        this.bimonthlyNote = bimonthlyNote;
    }

    public Long getAmountActivities() {
        return amountActivities;
    }

    public void setAmountActivities(Long amountActivities) {
        this.amountActivities = amountActivities;
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

    public Long getIdNumberStudent() {
        return idNumberStudent;
    }

    public void setIdNumberStudent(Long idNumberStudent) {
        this.idNumberStudent = idNumberStudent;
    }

    @Override
    public String toString() {
        return "RaitingEntity{"
                + "\nidRaiting=" + idRaiting
                + ", \nactivitiesNote=" + activitiesNote
                + ", \nbimonthlyNote=" + bimonthlyNote
                + ", \namountActivities=" + amountActivities
                + ", \nidDegSubj=" + idDegSubj
                + ", \ndegreeSubjectEntity=" + degreeSubjectEntity
                + ", \nidNumberStudent=" + idNumberStudent
                + ", \nstudentEntity=" + studentEntity
                + "\n" + '}';
    }

}
