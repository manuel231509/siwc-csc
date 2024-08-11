package com.colegiosantacecilia.siwcspringjava.mapper.achievementDifficulties;

import com.colegiosantacecilia.siwcspringjava.dto.achievementDifficulties.AchievementDifficultiesDTO;
import com.colegiosantacecilia.siwcspringjava.entities.achievementDifficulties.AchievementDifficultiesEntity;
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
public interface AchievementDifficultiesMapper {

    @Mappings({
        @Mapping(target = "codeDifficulties", source = "addto.code"),
        @Mapping(target = "descriptionDifficulties", source = "addto.description"),
        @Mapping(target = "idAchDifficulties", ignore = true)
    })
    AchievementDifficultiesEntity toAchievementDifficultiesEntity(AchievementDifficultiesDTO addto);

    List<AchievementDifficultiesEntity> toachiAchievementDifficultiesEntitys(List<AchievementDifficultiesDTO> addtos);

    @InheritInverseConfiguration
    @Mappings({
        @Mapping(target = "madto", ignore = true),
    })
    AchievementDifficultiesDTO toAchievementDifficultiesDTO(AchievementDifficultiesEntity ade);
}
