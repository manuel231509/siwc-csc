package com.colegiosantacecilia.siwcspringjava.mapper.periodPlan;

import com.colegiosantacecilia.siwcspringjava.dto.periodPlan.PeriodPlanDTO1;
import com.colegiosantacecilia.siwcspringjava.entities.periodPlan.PeriodPlanEntity;
import java.util.List;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

/**
 *
 * @author Sebastian Villamizar
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PeriodPlanMapper1 {

    /**
     *
     * @param ppdto
     * @return
     */
    @Mappings({
        @Mapping(target = "idPeriod", source = "ppdto.idPeriod"),
        @Mapping(target = "idDegSubj", source = "ppdto.idDegSubj"),
        @Mapping(target = "planName", source = "ppdto.planName"),
        @Mapping(target = "taskEntitys", ignore = true),
        @Mapping(target = "idPeriodPlan", ignore = true),
    })
    PeriodPlanEntity toPeriodPlanEntity(PeriodPlanDTO1 ppdto);

    List<PeriodPlanEntity> toPeriodPlanEntitys(List<PeriodPlanDTO1> periodPlanDTO1s);

    @InheritInverseConfiguration
    PeriodPlanDTO1 toPeriodPlanDTO1(PeriodPlanEntity ppe);
}
