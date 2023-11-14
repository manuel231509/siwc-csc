package com.colegiosantacecilia.siwcspringjava.mapper.raiting;

import com.colegiosantacecilia.siwcspringjava.dto.raiting.RaitingDTO;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
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
public interface RaitingMapper {

    /**
     *
     * @param rdto
     * @return
     */
    @Mappings({
        @Mapping(target = "idRaiting", source = "rdto.id"),
        @Mapping(target = "idPeriod", source = "rdto.idPeriod"),
        @Mapping(target = "idDegSubj", source = "rdto.idDegSubj"),
        @Mapping(target = "idNumberStudent", source = "rdto.idNumberStudent"),
        @Mapping(target = "activitiesNote", source = "rdto.activitiesNote"),
        @Mapping(target = "bimonthlyNote", source = "rdto.bimonthlyNote"),
        @Mapping(target = "amountActivities", source = "rdto.numberActivites")
    })
    RaitingEntity toRaitingEntity(RaitingDTO rdto);

    /**
     *
     * @param raitings
     * @return
     */
    List<RaitingEntity> toRaitingEntitys(List<RaitingDTO> raitings);

    /**
     *
     * @param re
     * @return
     */
    @InheritInverseConfiguration
    RaitingDTO toRaitingDTO(RaitingEntity re);

}
