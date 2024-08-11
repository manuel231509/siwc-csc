package com.colegiosantacecilia.siwcspringjava.entities.achievementDifficulties;

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
@Table(name = "achievement_difficulties",
        uniqueConstraints = {
            @UniqueConstraint(name = "code_difficulties_UK",
                    columnNames = {"code_difficulties"})
        })
public class AchievementDifficultiesEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_ach_difficulties")
    private Long idAchDifficulties;

    @Column(name = "code_difficulties", nullable = false, length = 250)
    private String codeDifficulties;

    @Column(name = "description_difficulties", nullable = false, length = 200)
    private String descriptionDifficulties;

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
            foreignKey = @ForeignKey(name = "main_achievement_difficulties_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private MainAchievementEntity mainAchievementEntity;

    public Long getIdAchDifficulties() {
        return idAchDifficulties;
    }

    public void setIdAchDifficulties(Long idAchDifficulties) {
        this.idAchDifficulties = idAchDifficulties;
    }

    public String getCodeDifficulties() {
        return codeDifficulties;
    }

    public void setCodeDifficulties(String codeDifficulties) {
        this.codeDifficulties = codeDifficulties;
    }

    public String getDescriptionDifficulties() {
        return descriptionDifficulties;
    }

    public void setDescriptionDifficulties(String descriptionDifficulties) {
        this.descriptionDifficulties = descriptionDifficulties;
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
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.idAchDifficulties);
        hash = 97 * hash + Objects.hashCode(this.codeDifficulties);
        hash = 97 * hash + Objects.hashCode(this.descriptionDifficulties);
        hash = 97 * hash + Objects.hashCode(this.initialNote);
        hash = 97 * hash + Objects.hashCode(this.finalNote);
        hash = 97 * hash + Objects.hashCode(this.idMainAchievement);
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
        final AchievementDifficultiesEntity other = (AchievementDifficultiesEntity) obj;
        if (!Objects.equals(this.codeDifficulties, other.codeDifficulties)) {
            return false;
        }
        if (!Objects.equals(this.descriptionDifficulties, other.descriptionDifficulties)) {
            return false;
        }
        if (!Objects.equals(this.idAchDifficulties, other.idAchDifficulties)) {
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
        return "AchievementDifficultiesEntity{"
                + "\nidAchDifficulties=" + idAchDifficulties
                + ", \ncodeDifficulties=" + codeDifficulties
                + ", \ndescriptionDifficulties=" + descriptionDifficulties
                + ", \ninitialNote=" + initialNote
                + ", \nfinalNote=" + finalNote
                + ", \nidMainAchievement=" + idMainAchievement
                + ", \nmainAchievementEntity=" + mainAchievementEntity
                + "\n" + '}';
    }

}
