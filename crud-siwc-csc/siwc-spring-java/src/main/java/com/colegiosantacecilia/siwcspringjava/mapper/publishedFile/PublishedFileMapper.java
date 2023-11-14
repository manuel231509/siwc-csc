package com.colegiosantacecilia.siwcspringjava.mapper.publishedFile;

import com.colegiosantacecilia.siwcspringjava.dto.publishedFile.PublishedFileDTO;
import com.colegiosantacecilia.siwcspringjava.entities.publishedFile.PublishedFileEntity;
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
public interface PublishedFileMapper {

    @Mappings({
        @Mapping(target = "idFile", source = "pfdto.id"),
        @Mapping(target = "fileName", source = "pfdto.name"),
        @Mapping(target = "fileUrl", source = "pfdto.url"),
        @Mapping(target = "fileType", source = "pfdto.type"),
        @Mapping(target = "fileLastModified", source = "pfdto.lastModified"),
        @Mapping(target = "fileSize", source = "pfdto.size"),
        @Mapping(target = "idPublishedTask", source = "pfdto.idPublishedTask")})
    PublishedFileEntity toPublishedFileEntity(PublishedFileDTO pfdto);

    List<PublishedFileEntity> toPublishedFileEntitys(List<PublishedFileDTO> publishedFileDTOs);

    @InheritInverseConfiguration
    PublishedFileDTO toPublishedFileDTO(PublishedFileEntity pfe);
}
