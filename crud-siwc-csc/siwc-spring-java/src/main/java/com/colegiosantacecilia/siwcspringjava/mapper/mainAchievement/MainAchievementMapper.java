package com.colegiosantacecilia.siwcspringjava.mapper.mainAchievement;

import com.colegiosantacecilia.siwcspringjava.dto.mainAchievement.MainAchievementDTO;
import com.colegiosantacecilia.siwcspringjava.entities.mainAchievement.MainAchievementEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.achievementDifficulties.AchievementDifficultiesMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.achievementRecommendations.AchievementRecommendationsMapper;
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
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {
    AchievementRecommendationsMapper.class,
    AchievementDifficultiesMapper.class
})
public interface MainAchievementMapper {

    @Mappings({
        @Mapping(target = "codeMain", source = "madto.code"),
        @Mapping(target = "descriptionMain", source = "madto.description"),
        @Mapping(target = "achievementRecommendationsEntitys", source = "madto.achievementRecommendationsDTOs"),
        @Mapping(target = "achievementDifficultiesEntitys", source = "madto.achievementDifficultiesDTOs"),
        @Mapping(target = "idMainAchievement", ignore = true)
    })
    MainAchievementEntity toMainAchievementEntity(MainAchievementDTO madto);

    List<MainAchievementEntity> toMainAchievementEntitys(List<MainAchievementDTO> madtos);

    @InheritInverseConfiguration
    @Mappings({
        @Mapping(target = "pdto", ignore = true),
        @Mapping(target = "dsdto", ignore = true),})
    MainAchievementDTO toMainAchievementDTO(MainAchievementEntity mae);
}
