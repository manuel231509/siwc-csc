package com.colegiosantacecilia.siwcspringjava.mapper.period;

import com.colegiosantacecilia.siwcspringjava.dto.period.PeriodDTO;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
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
public interface PeriodMapper {

    @Mappings({
        @Mapping(target = "idPeriod", source = "pdto.id"),
        @Mapping(target = "period", source = "pdto.period"),
        @Mapping(target = "periodName", source = "pdto.name"),
        @Mapping(target = "valuePercentageActivities", source = "pdto.valuePercentageActivities"),
        @Mapping(target = "valuePercentageBimonthly", source = "pdto.valuePercentageBimonthly"),
        @Mapping(target = "initialDate", source = "pdto.startDate"),
        @Mapping(target = "finalDate", source = "pdto.endDate")
    })
    PeriodEntity toPeriodEntity(PeriodDTO pdto);

    List<PeriodEntity> toPeriodEntitys(List<PeriodDTO> periods);

    @InheritInverseConfiguration
    PeriodDTO toPeriodDTO(PeriodEntity pe);
}
