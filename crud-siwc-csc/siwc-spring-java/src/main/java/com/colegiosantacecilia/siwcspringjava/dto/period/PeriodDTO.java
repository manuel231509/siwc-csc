package com.colegiosantacecilia.siwcspringjava.dto.period;

import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class PeriodDTO {

    private String id;

    @NotBlank(message = "THE PERIOD FIELD IS REQUIRED.")
    @Size(min = 2, max = 2, message = "THE PERIOD FIELD MUST HAVE A MINIMUM OF 2 CHARACTERS AND A MAX OF 2 CHARACTERS.")
    private String period;

    @NotBlank(message = "THE PERIOD NAME FIELD IS REQUIRED.")
    @Size(max = 40, message = "THE PERIOD NAME FIELD MUST HAVE A MAXIMUM OF 40 CHARACTERS.")
    private String name;

    private Double valuePercentageActivities;

    private Double valuePercentageBimonthly;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    public PeriodDTO() {
    }

    public PeriodDTO(String name, Date startDate, Date endDate) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getValuePercentageActivities() {
        return valuePercentageActivities;
    }

    public void setValuePercentageActivities(Double valuePercentageActivities) {
        this.valuePercentageActivities = valuePercentageActivities;
    }

    public Double getValuePercentageBimonthly() {
        return valuePercentageBimonthly;
    }

    public void setValuePercentageBimonthly(Double valuePercentageBimonthly) {
        this.valuePercentageBimonthly = valuePercentageBimonthly;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

}
