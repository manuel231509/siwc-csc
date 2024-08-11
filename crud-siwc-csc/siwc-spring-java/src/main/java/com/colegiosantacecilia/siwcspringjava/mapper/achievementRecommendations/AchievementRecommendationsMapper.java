package com.colegiosantacecilia.siwcspringjava.mapper.achievementRecommendations;

import com.colegiosantacecilia.siwcspringjava.dto.achievementRecommendations.AchievementRecommendationsDTO;
import com.colegiosantacecilia.siwcspringjava.entities.achievementRecommendations.AchievementRecommendationsEntity;
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
public interface AchievementRecommendationsMapper {

    @Mappings({
        @Mapping(target = "codeRecommendations", source = "ardto.code"),
        @Mapping(target = "descriptionRecommendations", source = "ardto.description"),
        @Mapping(target = "idAchRecommendations", ignore = true)
    })
    AchievementRecommendationsEntity toaAchievementRecommendationsEntity(AchievementRecommendationsDTO ardto);

    List<AchievementRecommendationsEntity> toaAchievementRecommendationsEntitys(List<AchievementRecommendationsDTO> ardtos);

    @InheritInverseConfiguration
    @Mappings({
        @Mapping(target = "madto", ignore = true)
    })
    AchievementRecommendationsDTO toaAchievementRecommendationsDTO(AchievementRecommendationsEntity are);
}
