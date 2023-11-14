package com.colegiosantacecilia.siwcspringjava.mapper.taskFile;

import com.colegiosantacecilia.siwcspringjava.dto.taskFile.TaskFileDTO;
import com.colegiosantacecilia.siwcspringjava.entities.taskFile.TaskFileEntity;
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
public interface TaskFileMapper {

    @Mappings({
        @Mapping(target = "idFile", source = "tfdto.id"),
        @Mapping(target = "fileName", source = "tfdto.name"),
        @Mapping(target = "fileUrl", source = "tfdto.url"),
        @Mapping(target = "fileType", source = "tfdto.type"),
        @Mapping(target = "fileLastModified", source = "tfdto.lastModified"),
        @Mapping(target = "fileSize", source = "tfdto.size"),
        @Mapping(target = "idTask", source = "tfdto.idTask")})
    TaskFileEntity toTaskFileEntity(TaskFileDTO tfdto);

    List<TaskFileEntity> toTaskFileEntitys(List<TaskFileDTO> taskFileDTOs);

    @InheritInverseConfiguration
    TaskFileDTO toTaskFileDTO(TaskFileEntity tfe);
}
