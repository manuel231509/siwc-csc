package com.colegiosantacecilia.siwcspringjava.dto.periodPlan;

import com.colegiosantacecilia.siwcspringjava.dto.task.TaskDTO;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class PeriodPlanDTO {

    @NotBlank(message = "THE idPeriod FIELD IS REQUIRED.")
    @Size(max = 200, message = "THE idPeriod FIELD MUST HAVE A MAXIMUM OF 200 CHARACTERS.")
    private String idPeriod;

    @NotBlank(message = "THE idDegSubj FIELD IS REQUIRED.")
    @Size(max = 255, message = "THE idDegSubj FIELD MUST HAVE A MAXIMUM OF 255 CHARACTERS.")
    private String idDegSubj;

    @NotBlank(message = "THE planName FIELD IS REQUIRED.")
    @Size(max = 50, message = "THE planName FIELD MUST HAVE A MAXIMUM OF 50 CHARACTERS.")
    private String planName;

    @Valid
    private TaskDTO taskDTO = null;

    public PeriodPlanDTO() {
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

    public TaskDTO getTaskDTO() {
        return taskDTO;
    }

    public void setTaskDTO(TaskDTO taskDTO) {
        this.taskDTO = taskDTO;
    }

}
