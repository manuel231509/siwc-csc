package com.colegiosantacecilia.siwcspringjava.mapper.administrator;

import com.colegiosantacecilia.siwcspringjava.dto.administrator.AdministratorDTO;
import com.colegiosantacecilia.siwcspringjava.entities.administrator.AdministratorEntity;
import java.util.List;
import org.mapstruct.*;

/**
 *
 * @author Sebastian Villamizar
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AdministratorMapper {

    @Mappings({
        @Mapping(target = "idNumberAdministrator", source = "adto.idNumber"),
        @Mapping(target = "documentTypeAdministrator", source = "adto.documentType"),
        @Mapping(target = "fullNamesAdministrator", source = "adto.fullNames"),
        @Mapping(target = "fullSurNamesAdministrator", source = "adto.fullSurNames"),
        @Mapping(target = "emailAddressAdministrator", source = "adto.emailAddress"),
        @Mapping(target = "phoneNumberAdministrator", source = "adto.phoneNumber"),
        @Mapping(target = "imagePathAdministrator", source = "adto.imagePath")
    })
    AdministratorEntity toAdministratorEntity(AdministratorDTO adto);

    List<AdministratorEntity> toAdministrator(List<AdministratorDTO> administrator);

    @InheritInverseConfiguration
    AdministratorDTO toAdministratorDTO(AdministratorEntity ae);
}
