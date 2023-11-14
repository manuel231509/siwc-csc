package com.colegiosantacecilia.siwcspringjava.mapper.rol;

import com.colegiosantacecilia.siwcspringjava.dto.rol.RoleDTO;
import com.colegiosantacecilia.siwcspringjava.entities.rol.RolEntity;
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
public interface RolMapper {

    @Mappings({
        @Mapping(target = "nameRole", source = "rdto.name")
    })
    RolEntity toRolEntity(RoleDTO rdto);

    List<RolEntity> toRols(List<RoleDTO> rols);

    @InheritInverseConfiguration
    RoleDTO toRoleDTO(RolEntity re);
}
