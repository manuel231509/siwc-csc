package com.colegiosantacecilia.siwcspringjava.mapper.publishedTask;

import com.colegiosantacecilia.siwcspringjava.dto.publishedTask.PublishedTaskDTO;
import com.colegiosantacecilia.siwcspringjava.entities.publishedTask.PublishedTaskEntity;
import java.util.List;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

/**
 *
 * @author Sebstian Villamizar
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PublishedTaskMapper {

    @Mappings({
        @Mapping(target = "idPublishedTask", source = "ptdto.idPublishedTask"),
        @Mapping(target = "taskNote", source = "ptdto.taskNote"),
        @Mapping(target = "idNumberStudent", source = "ptdto.idNumberStudent"),
        @Mapping(target = "idTask", source = "ptdto.idTask")})
    PublishedTaskEntity toPublishedTaskEntity(PublishedTaskDTO ptdto);
    
    List<PublishedTaskEntity> toPublishedTaskEntitys(List<PublishedTaskDTO> publishedTaskDTOs);
    
    @InheritInverseConfiguration
    PublishedTaskDTO toPublishedTaskDTO(PublishedTaskEntity pte);
}
