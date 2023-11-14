package com.colegiosantacecilia.siwcspringjava.mapper.degree;

import com.colegiosantacecilia.siwcspringjava.dto.degree.DegreeDTO;
import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
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
public interface DegreeMapper {

    @Mappings({
        @Mapping(target = "nameDegree", source = "ddto.name")
    })
    DegreeEntity toDegreeEntity(DegreeDTO ddto);

    List<DegreeEntity> toDegrees(List<DegreeDTO> degrees);

    @InheritInverseConfiguration
    DegreeDTO toDegreeDTO(DegreeEntity de);

}
