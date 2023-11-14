package com.colegiosantacecilia.siwcspringjava.mapper.degreeSubject;

import com.colegiosantacecilia.siwcspringjava.dto.degreeSubject.DegreeSubjectDTO;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
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
public interface DegreeSubjectMapper {
    @Mappings({
        @Mapping(target = "idDegree",source = "dsdto.idDegree"),
        @Mapping(target = "idSubject",source = "dsdto.idSubject")
    })
    DegreeSubjectEntity toDegreeSubjectEntity(DegreeSubjectDTO dsdto);
    
    @InheritInverseConfiguration
    @Mappings({
        @Mapping(target = "nameDegree",ignore = true),
        @Mapping(target = "nameSubject",ignore = true),
    })
    DegreeSubjectDTO toDegreeSubjectDTO(DegreeSubjectEntity dse);
}
