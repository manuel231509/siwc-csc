package com.colegiosantacecilia.siwcspringjava.dto.achievementDifficulties;

import com.colegiosantacecilia.siwcspringjava.dto.mainAchievement.MainAchievementDTO;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 *
 * @author Sebastian Villamizar
 */
public class AchievementDifficultiesDTO {

    @NotBlank(message = "THE code FIELD IS REQUIRED.")
    @Size(max = 250, message = "THE code FIELD MUST HAVE A MAXIMUM OF 250 CHARACTERS.")
    private String code;

    @NotBlank(message = "THE description FIELD IS REQUIRED.")
    @Size(max = 200, message = "THE description FIELD MUST HAVE A MAXIMUM OF 200 CHARACTERS.")
    private String description;

    private Float initialNote;

    private Float finalNote;

    private Long idMainAchievement;

    @Valid
    private MainAchievementDTO madto = null;

    public AchievementDifficultiesDTO() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public MainAchievementDTO getMadto() {
        return madto;
    }

    public void setMadto(MainAchievementDTO madto) {
        this.madto = madto;
    }

    @Override
    public String toString() {
        return "AchievementDifficultiesDTO{"
                + "\ncode=" + code
                + ", \ndescription=" + description
                + ", \ninitialNote=" + initialNote
                + ", \nfinalNote=" + finalNote
                + ", \nidMainAchievement=" + idMainAchievement
                + ", \nmadto=" + madto
                + "\n" + '}';
    }
}
