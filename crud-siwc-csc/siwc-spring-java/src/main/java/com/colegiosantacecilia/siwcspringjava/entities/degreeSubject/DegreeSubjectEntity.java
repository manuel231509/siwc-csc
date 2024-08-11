package com.colegiosantacecilia.siwcspringjava.entities.degreeSubject;

import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
import com.colegiosantacecilia.siwcspringjava.entities.mainAchievement.MainAchievementEntity;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.io.Serializable;
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
@Table(name = "degree_subject",
        uniqueConstraints = @UniqueConstraint(name = "id_degree_subject_UK",
                columnNames = {"id_degree", "id_subject"}))
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "degreeEntity"})
public class DegreeSubjectEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_deg_subj", length = 255)
    private String idDegSubj;

    @Column(name = "id_degree", nullable = false, length = 500)
    private String idDegree;

    @Column(name = "id_subject", nullable = false, length = 255)
    private String idSubject;

    @ManyToOne(fetch = FetchType.EAGER, 
            cascade = CascadeType.ALL)
    @MapsId("idDegree")
    @JoinColumn(name = "id_degree",
            foreignKey = @ForeignKey(name = "degree_subject_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private DegreeEntity degreeEntity;

    @ManyToOne(cascade = CascadeType.ALL, 
            fetch = FetchType.EAGER)
    @MapsId("idSubject")
    @JoinColumn(name = "id_subject",
            foreignKey = @ForeignKey(name = "subject_degree_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private SubjectEntity subjectEntity;

//    @OneToMany(mappedBy = "degreeSubjectEntity",
//            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY)
//    @Fetch(value = FetchMode.SUBSELECT)
//    private List<RaitingEntity> raitingEntitys
//            = new LinkedList();
//
//    @OneToMany(mappedBy = "degreeSubjectEntity",
//            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY)
//    @Fetch(value = FetchMode.SUBSELECT)
//    private List<PeriodPlanEntity> periodPlanEntitys
//            = new LinkedList<>();
    
    @OneToMany(mappedBy = "degreeSubjectEntity",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
   @Fetch(value = FetchMode.SUBSELECT)
    private List<MainAchievementEntity> mainAchievementEntitys
            = new LinkedList<>();

    public DegreeSubjectEntity() {
    }

    public DegreeSubjectEntity(String idDegree, String idSubject) {
        this.idDegree = idDegree;
        this.idSubject = idSubject;
    }

    public String getIdDegSubj() {
        return idDegSubj;
    }

    public void setIdDegSubj(String idDegSubj) {
        this.idDegSubj = idDegSubj;
    }

    public String getIdDegree() {
        return idDegree;
    }

    public void setIdDegree(String idDegree) {
        this.idDegree = idDegree;
    }

    public String getIdSubject() {
        return idSubject;
    }

    public void setIdSubject(String idSubject) {
        this.idSubject = idSubject;
    }

//    public DegreeEntity getDegreeEntity() {
//        return degreeEntity;
//    }
//
//    public void setDegreeEntity(DegreeEntity degreeEntity) {
//        this.degreeEntity = degreeEntity;
//    }

//    public SubjectEntity getSubjectEntity() {
//        return subjectEntity;
//    }
//
//    public void setSubjectEntity(SubjectEntity subjectEntity) {
//        this.subjectEntity = subjectEntity;
//    }

//    public List<RaitingEntity> getRaitingEntitys() {
//        return raitingEntitys;
//    }
//
//    public void setRaitingEntitys(List<RaitingEntity> raitingEntitys) {
//        this.raitingEntitys = raitingEntitys;
//    }
//
//    public void addListRaitingEntitys(RaitingEntity re) {
//        this.raitingEntitys.add(re);
//    }
//
//    public List<PeriodPlanEntity> getPeriodPlanEntitys() {
//        return periodPlanEntitys;
//    }
//
//    public void setPeriodPlanEntitys(List<PeriodPlanEntity> periodPlanEntitys) {
//        this.periodPlanEntitys = periodPlanEntitys;
//    }
//
//    public void addListPeriodPlanEntitys(PeriodPlanEntity ppe) {
//        this.periodPlanEntitys.add(ppe);
//    }

    public List<MainAchievementEntity> getMainAchievementEntitys() {
        return mainAchievementEntitys;
    }

    public void setMainAchievementEntitys(List<MainAchievementEntity> mainAchievementEntitys) {
        this.mainAchievementEntitys = mainAchievementEntitys;
    }
    
    public void addListMainAchievementEntitys(MainAchievementEntity mae){
        this.mainAchievementEntitys.add(mae);
    }

    @Override
    public String toString() {
        return "DegreeSubjectEnity{"
                + "\nidDegSubj=" + idDegSubj
                + ", \nidDegree=" + idDegree
                + ", \nidSubject=" + idSubject
                + ", \ndegreeEntity=" + degreeEntity
                + ", \nsubjectEntity=" + subjectEntity
                + ", \nmainAchievementEntitys=" + mainAchievementEntitys
                //+ ", \nraitingEntity=" + raitingEntitys
                + "\n" + '}';
    }

}
