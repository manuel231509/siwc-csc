package com.colegiosantacecilia.siwcspringjava.entities.period;

import com.colegiosantacecilia.siwcspringjava.entities.mainAchievement.MainAchievementEntity;
import com.colegiosantacecilia.siwcspringjava.entities.periodPlan.PeriodPlanEntity;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import javax.persistence.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "period")
public class PeriodEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_period")
    private String idPeriod;

    @Column(length = 2)
    private String period;

    @Column(name = "period_name", nullable = false, length = 40)
    private String periodName;

    @Column(name = "value_percentage_activities", nullable = false)
    private Double valuePercentageActivities;

    @Column(name = "value_percentage_bimonthly", nullable = false)
    private Double valuePercentageBimonthly;

    @Column(name = "initial_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date initialDate;

    @Column(name = "final_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date finalDate;

    @OneToMany(mappedBy = "periodEntity", cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<RaitingEntity> raitingEntitys
            = new LinkedList<>();

    @OneToMany(mappedBy = "periodEntity",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<PeriodPlanEntity> periodPlanEntitys
            = new LinkedList<>();

    @OneToMany(mappedBy = "periodEntity",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<MainAchievementEntity> mainAchievementEntitys
            = new LinkedList<>();
    
    public PeriodEntity() {
    }

    public PeriodEntity(String periodId, String periodName, Date initialDate, Date finalDate) {
        this.idPeriod = periodId;
        this.periodName = periodName;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
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
        final PeriodEntity other = (PeriodEntity) obj;
        if (!Objects.equals(this.idPeriod, other.idPeriod)) {
            return false;
        }
        if (!Objects.equals(this.period, other.period)) {
            return false;
        }
        if (!Objects.equals(this.periodName, other.periodName)) {
            return false;
        }
        if (!Objects.equals(this.valuePercentageActivities, other.valuePercentageActivities)) {
            return false;
        }
        if (!Objects.equals(this.valuePercentageBimonthly, other.valuePercentageBimonthly)) {
            return false;
        }
        if (!Objects.equals(this.initialDate, other.initialDate)) {
            return false;
        }
        return Objects.equals(this.finalDate, other.finalDate);
    }

    public void setPropertyValue(String propertyName, Object value) {
        try {
            Field field = getClass().getDeclaredField(propertyName);
            field.setAccessible(true);
            field.set(this, value);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }
//    public void setPropertyValue(String propertyName, Object value) {
//        switch (propertyName) {
//            case "period":
//                setPeriod((String) value);
//                break;
//            case "periodName":
//                setPeriodName((String) value);
//                break;
//            case "valuePercentageActivities":
//                setValuePercentageActivities((Double) value);
//                break;
//            case "valuePercentageBimonthly":
//                setValuePercentageBimonthly((Double) value);
//                break;
//            case "initialDate":
//                setInitialDate((Date) value);
//                break;
//            case "finalDate":
//                setFinalDate((Date) value);
//                break;
//            default:
//                break;
//        }
//    }

    public String getIdPeriod() {
        return idPeriod;
    }

    public void setIdPeriod(String idPeriod) {
        this.idPeriod = idPeriod;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getPeriodName() {
        return periodName;
    }

    public void setPeriodName(String periodName) {
        this.periodName = periodName;
    }

    public Date getInitialDate() {
        return initialDate;
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

    public void setInitialDate(Date initialDate) {
        this.initialDate = initialDate;
    }

    public Date getFinalDate() {
        return finalDate;
    }

    public void setFinalDate(Date finalDate) {
        this.finalDate = finalDate;
    }

    public List<RaitingEntity> getRaitingEntitys() {
        return raitingEntitys;
    }

    public void setRaitingEntitys(List<RaitingEntity> raitingEntitys) {
        this.raitingEntitys = raitingEntitys;
    }

    public void addListRaitingEntitys(RaitingEntity re) {
        this.raitingEntitys.add(re);
    }

    public List<PeriodPlanEntity> getPeriodPlanEntitys() {
        return periodPlanEntitys;
    }

    public void setPeriodPlanEntitys(List<PeriodPlanEntity> periodPlanEntitys) {
        this.periodPlanEntitys = periodPlanEntitys;
    }

    public void addListPeriodPlanEntitys(PeriodPlanEntity ppe) {
        this.periodPlanEntitys.add(ppe);
    }

    public List<MainAchievementEntity> getMainAchievementEntitys() {
        return mainAchievementEntitys;
    }

    public void setMainAchievementEntitys(List<MainAchievementEntity> mainAchievementEntitys) {
        this.mainAchievementEntitys = mainAchievementEntitys;
    }

    public void addListMainAchievementEntitys(MainAchievementEntity mae) {
        this.mainAchievementEntitys.add(mae);
    }

    @Override
    public String toString() {
        return "PeriodEntity{"
                + "\nidPeriod=" + idPeriod
                + ", \nperiod=" + period
                + ", \nperiodName=" + periodName
                + ", \nvaluePercentageActivities=" + valuePercentageActivities
                + ", \nvaluePercentageBimonthly=" + valuePercentageBimonthly
                + ", \ninitialDate=" + initialDate
                + ", \nfinalDate=" + finalDate
                + ", \nraitingEntitys=" + raitingEntitys
                + ", \nperiodPlanEntitys=" + periodPlanEntitys
                + ", \nmainAchievementEntitys=" + mainAchievementEntitys + "\n" + '}';
    }
}
