package com.colegiosantacecilia.siwcspringjava.dto.mainAchievement;

import com.colegiosantacecilia.siwcspringjava.dto.achievementDifficulties.AchievementDifficultiesDTO;
import com.colegiosantacecilia.siwcspringjava.dto.achievementRecommendations.AchievementRecommendationsDTO;
import com.colegiosantacecilia.siwcspringjava.dto.degreeSubject.DegreeSubjectDTO;
import com.colegiosantacecilia.siwcspringjava.dto.period.PeriodDTO;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class MainAchievementDTO {

    @NotBlank(message = "THE code FIELD IS REQUIRED.")
    @Size(max = 250, message = "THE code FIELD MUST HAVE A MAXIMUM OF 250 CHARACTERS.")
    private String code;

    @NotBlank(message = "THE description FIELD IS REQUIRED.")
    @Size(max = 200, message = "THE description FIELD MUST HAVE A MAXIMUM OF 200 CHARACTERS.")
    private String description;

    @NotNull(message = "THE initialNote FIELD IS REQUIRED.")
    private Float initialNote;

    @NotNull(message = "THE finalNote FIELD IS REQUIRED.")
    private Float finalNote;

    @NotBlank(message = "THE idDegSubj FIELD IS REQUIRED.")
    @Size(max = 255, message = "THE idDegSubj FIELD MUST HAVE A MAXIMUM OF 255 CHARACTERS")
    private String idDegSubj;

    @NotBlank(message = "THE idPeriod FIELD IS REQUIRED.")
    @Size(max = 200, message = "THE idPeriod FIELD MUST HAVE A MAXIMUM OF 200 CHARACTERS")
    private String idPeriod;

    @Valid
    private PeriodDTO pdto = null;

    @Valid
    private DegreeSubjectDTO dsdto = null;

    @Valid
    private List<AchievementRecommendationsDTO> achievementRecommendationsDTOs = null;

    @Valid
    private List<AchievementDifficultiesDTO> achievementDifficultiesDTOs = null;

    public MainAchievementDTO() {
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

    public String getIdDegSubj() {
        return idDegSubj;
    }

    public void setIdDegSubj(String idDegSubj) {
        this.idDegSubj = idDegSubj;
    }

    public String getIdPeriod() {
        return idPeriod;
    }

    public void setIdPeriod(String idPeriod) {
        this.idPeriod = idPeriod;
    }

    public PeriodDTO getPdto() {
        return pdto;
    }

    public void setPdto(PeriodDTO pdto) {
        this.pdto = pdto;
    }

    public DegreeSubjectDTO getDsdto() {
        return dsdto;
    }

    public void setDsdto(DegreeSubjectDTO dsdto) {
        this.dsdto = dsdto;
    }

    public List<AchievementRecommendationsDTO> getAchievementRecommendationsDTOs() {
        return achievementRecommendationsDTOs;
    }

    public void setAchievementRecommendationsDTOs(List<AchievementRecommendationsDTO> achievementRecommendationsDTOs) {
        this.achievementRecommendationsDTOs = achievementRecommendationsDTOs;
    }

    public List<AchievementDifficultiesDTO> getAchievementDifficultiesDTOs() {
        return achievementDifficultiesDTOs;
    }

    public void setAchievementDifficultiesDTOs(List<AchievementDifficultiesDTO> achievementDifficultiesDTOs) {
        this.achievementDifficultiesDTOs = achievementDifficultiesDTOs;
    }

    @Override
    public String toString() {
        return "MainAchievementDTO{"
                + "\ncode=" + code
                + ", \ndescription=" + description
                + ", \ninitialNote=" + initialNote
                + ", \nfinalNote=" + finalNote
                + ", \nidDegSubj=" + idDegSubj
                + ", \nidPeriod=" + idPeriod
                + ", \npdto=" + pdto
                + ", \ndsdto=" + dsdto
                + ", \nachievementRecommendationsDTOs=" + achievementRecommendationsDTOs
                + ", \nachievementDifficultiesDTOs=" + achievementDifficultiesDTOs
                + "\n" + '}';
    }

}
