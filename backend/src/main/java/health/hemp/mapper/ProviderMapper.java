package health.hemp.mapper;

import health.hemp.domain.entity.ProviderEntity;
import health.hemp.dto.ProviderDTO;

public class ProviderMapper {

    public static ProviderDTO toDTO(ProviderEntity entity) {
        if (entity == null) return null;
        return ProviderDTO.builder()
                .providerId(entity.getProviderId())
                .npi(entity.getNpi())
                .taxonomyCode(entity.getTaxonomyCode())
                .licenseNumber(entity.getLicenseNumber())
                .credentialingStatus(entity.getCredentialingStatus())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public static ProviderEntity toEntity(ProviderDTO dto) {
        if (dto == null) return null;
        return ProviderEntity.builder()
                .providerId(dto.getProviderId())
                .npi(dto.getNpi())
                .taxonomyCode(dto.getTaxonomyCode())
                .licenseNumber(dto.getLicenseNumber())
                .credentialingStatus(dto.getCredentialingStatus() != null ? dto.getCredentialingStatus() : "PENDING")
                .build();
    }
}
