package com.colegiosantacecilia.siwcspringjava.mapper.periodPlan;

import com.colegiosantacecilia.siwcspringjava.dto.periodPlan.PeriodPlanDTO;
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
public interface PeriodPlanMapper {

    @Mappings({
        @Mapping(target = "idPeriod", source = "ppdto.idPeriod"),
        @Mapping(target = "idDegSubj", source = "ppdto.idDegSubj"),
        @Mapping(target = "planName", source = "ppdto.planName")
    })
    PeriodPlanEntity toPeriodPlanEntity(PeriodPlanDTO ppdto);

    List<PeriodPlanEntity> toPeriodPlanEntitys(List<PeriodPlanDTO> periodsPlans);

    @InheritInverseConfiguration
    PeriodPlanDTO toPeriodPlanDTO(PeriodPlanEntity ppe);
}
