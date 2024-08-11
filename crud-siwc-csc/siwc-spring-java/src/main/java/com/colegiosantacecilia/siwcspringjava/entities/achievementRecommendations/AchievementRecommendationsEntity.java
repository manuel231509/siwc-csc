package com.colegiosantacecilia.siwcspringjava.entities.achievementRecommendations;

import com.colegiosantacecilia.siwcspringjava.entities.mainAchievement.MainAchievementEntity;
import java.io.Serializable;
import java.util.Objects;
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
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "achievement_recommendations",
        uniqueConstraints = {
            @UniqueConstraint(name = "code_recommendations_UK",
                    columnNames = {"code_recommendations"})
        })
public class AchievementRecommendationsEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_ach_recommendations")
    private Long idAchRecommendations;

    @Column(name = "code_recommendations", nullable = false, length = 250)
    private String codeRecommendations;

    @Column(name = "description_recommendations", nullable = false, length = 200)
    private String descriptionRecommendations;

    @Column(name = "initial_note", nullable = false)
    private Float initialNote;

    @Column(name = "final_note", nullable = false)
    private Float finalNote;

    @Column(name = "id_main_achievement")
    private Long idMainAchievement;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = false)
    @MapsId("idMainAchievement")
    @JoinColumn(name = "id_main_achievement",
            foreignKey = @ForeignKey(name = "main_achievement_recommendations_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private MainAchievementEntity mainAchievementEntity;

    public AchievementRecommendationsEntity() {
    }

    public Long getIdAchRecommendations() {
        return idAchRecommendations;
    }

    public void setIdAchRecommendations(Long idAchRecommendations) {
        this.idAchRecommendations = idAchRecommendations;
    }

    public String getCodeRecommendations() {
        return codeRecommendations;
    }

    public void setCodeRecommendations(String codeRecommendations) {
        this.codeRecommendations = codeRecommendations;
    }

    public String getDescriptionRecommendations() {
        return descriptionRecommendations;
    }

    public void setDescriptionRecommendations(String descriptionRecommendations) {
        this.descriptionRecommendations = descriptionRecommendations;
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

    public Long getIdMainAchievement() {
        return idMainAchievement;
    }

    public void setIdMainAchievement(Long idMainAchievement) {
        this.idMainAchievement = idMainAchievement;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 43 * hash + Objects.hashCode(this.idAchRecommendations);
        hash = 43 * hash + Objects.hashCode(this.codeRecommendations);
        hash = 43 * hash + Objects.hashCode(this.descriptionRecommendations);
        hash = 43 * hash + Objects.hashCode(this.initialNote);
        hash = 43 * hash + Objects.hashCode(this.finalNote);
        hash = 43 * hash + Objects.hashCode(this.idMainAchievement);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final AchievementRecommendationsEntity other = (AchievementRecommendationsEntity) obj;
        if (!Objects.equals(this.codeRecommendations, other.codeRecommendations)) {
            return false;
        }
        if (!Objects.equals(this.descriptionRecommendations, other.descriptionRecommendations)) {
            return false;
        }
        if (!Objects.equals(this.idAchRecommendations, other.idAchRecommendations)) {
            return false;
        }
        if (!Objects.equals(this.initialNote, other.initialNote)) {
            return false;
        }
        if (!Objects.equals(this.finalNote, other.finalNote)) {
            return false;
        }
        return Objects.equals(this.idMainAchievement, other.idMainAchievement);
    }

    @Override
    public String toString() {
        return "AchievementRecommendationsEntity{"
                + "\nidAchRecommendations=" + idAchRecommendations
                + ", \ncodeRecommendations=" + codeRecommendations
                + ", \ndescriptionRecommendations=" + descriptionRecommendations
                + ", \ninitialNote=" + initialNote
                + ", \nfinalNote=" + finalNote
                + ", \nidMainAchievement=" + idMainAchievement
                + ", \nmainAchievementEntity=" + mainAchievementEntity
                + "\n" + '}';
    }
}
