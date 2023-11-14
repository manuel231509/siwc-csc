package com.colegiosantacecilia.siwcspringjava.mapper.task;

import com.colegiosantacecilia.siwcspringjava.dto.task.TaskDTO;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;
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
public interface TaskMapper {

    @Mappings({
        @Mapping(target = "taskName", source = "tdto.name"),
        @Mapping(target = "taskDescription", source = "tdto.description"),
        @Mapping(target = "taskQualificationPoints", source = "tdto.qualificationPoints"),
        @Mapping(target = "datePublicationTask", source = "tdto.datePublicationTask"),
        @Mapping(target = "taskDeadLine", source = "tdto.deadline"),
        @Mapping(target = "taskTimeLimit", source = "tdto.timeLimit"),
        @Mapping(target = "idPeriodPlan", source = "tdto.idPeriodPlan")})
    TaskEntity toTaskEntity(TaskDTO tdto);

    List<TaskEntity> toTaskEntitys(List<TaskDTO> taskDTOs);

    @InheritInverseConfiguration
    TaskDTO taskDTO(TaskEntity te);
}
