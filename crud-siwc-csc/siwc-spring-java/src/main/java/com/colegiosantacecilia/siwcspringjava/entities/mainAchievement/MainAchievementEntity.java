package com.colegiosantacecilia.siwcspringjava.entities.mainAchievement;

import com.colegiosantacecilia.siwcspringjava.entities.achievementDifficulties.AchievementDifficultiesEntity;
import com.colegiosantacecilia.siwcspringjava.entities.achievementRecommendations.AchievementRecommendationsEntity;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
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
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "main_achievement",
        uniqueConstraints = {
            @UniqueConstraint(name = "code_main_UK",
                    columnNames = {"code_main"})})
public class MainAchievementEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_main_achievement")
    private Long idMainAchievement;

    @Column(name = "code_main", nullable = false, length = 250)
    private String codeMain;

    @Column(name = "description_main", nullable = false, length = 200)
    private String descriptionMain;

    @Column(name = "initial_note", nullable = false)
    private Float initialNote;

    @Column(name = "final_note", nullable = false)
    private Float finalNote;

    @Column(name = "id_period", nullable = false, length = 200)
    private String idPeriod;

    @Column(name = "id_deg_subj", nullable = false, length = 255)
    private String idDegSubj;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @MapsId("idPeriod")
    @JoinColumn(name = "id_period",
            foreignKey = @ForeignKey(name = "main_achievement_period_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private PeriodEntity periodEntity;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @MapsId("idDegSubj")
    @JoinColumn(name = "id_deg_subj",
            foreignKey = @ForeignKey(name = "main_achievement_degree_subject_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private DegreeSubjectEntity degreeSubjectEntity;

    @OneToMany(mappedBy = "mainAchievementEntity",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<AchievementDifficultiesEntity> achievementDifficultiesEntitys
            = new LinkedList<>();

    @OneToMany(mappedBy = "mainAchievementEntity",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<AchievementRecommendationsEntity> achievementRecommendationsEntitys
            = new LinkedList<>();

    public MainAchievementEntity() {
    }

    public Long getIdMainAchievement() {
        return idMainAchievement;
    }

    public void setIdMainAchievement(Long idMainAchievement) {
        this.idMainAchievement = idMainAchievement;
    }

    public String getCodeMain() {
        return codeMain;
    }

    public void setCodeMain(String codeMain) {
        this.codeMain = codeMain;
    }

    public String getDescriptionMain() {
        return descriptionMain;
    }

    public void setDescriptionMain(String descriptionMain) {
        this.descriptionMain = descriptionMain;
    }

    public Float getInitialNote() {
        return initialNote;
    }

    public void setInitialNote(Float initialNote) {
        this.initialNote = initialNote;
    }

    public Float getFinalNote() {
        return finalNote;
    }

    public void setFinalNote(Float finalNote) {
        this.finalNote = finalNote;
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

    public List<AchievementDifficultiesEntity> getAchievementDifficultiesEntitys() {
        return achievementDifficultiesEntitys;
    }

    public void setAchievementDifficultiesEntitys(List<AchievementDifficultiesEntity> achievementDifficultiesEntitys) {
        this.achievementDifficultiesEntitys = achievementDifficultiesEntitys;
    }

    public void addAchievementDifficultiesEntitys(AchievementDifficultiesEntity ade) {
        this.achievementDifficultiesEntitys.add(ade);
    }

    public List<AchievementRecommendationsEntity> getAchievementRecommendationsEntitys() {
        return achievementRecommendationsEntitys;
    }

    public void setAchievementRecommendationsEntitys(List<AchievementRecommendationsEntity> achievementRecommendationsEntitys) {
        this.achievementRecommendationsEntitys = achievementRecommendationsEntitys;
    }

    public void addAchievementRecommendationsEntitys(AchievementRecommendationsEntity are) {
        this.achievementRecommendationsEntitys.add(are);
    }

    @Override
    public String toString() {
        return "MainAchievementEntity{"
                + "\nidMainAchievement=" + idMainAchievement
                + ", \ncodeMain=" + codeMain
                + ", \ndescriptionMain=" + descriptionMain
                + ", \ninitialNote=" + initialNote
                + ", \nfinalNote=" + finalNote
                + ", \nidPeriod=" + idPeriod
                + ", \nidDegSubj=" + idDegSubj
                + ", \nperiodEntity=" + periodEntity
                + ", \ndegreeSubjectEntity=" + degreeSubjectEntity
                + ", \nachievementDifficultiesEntitys=" + achievementDifficultiesEntitys
                + ", \nachievementRecommendationsEntitys=" + achievementRecommendationsEntitys
                + "\n" + '}';
    }
}
