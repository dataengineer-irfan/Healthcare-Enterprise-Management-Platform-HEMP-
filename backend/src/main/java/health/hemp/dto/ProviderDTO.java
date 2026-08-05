package health.hemp.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderDTO {

    private UUID providerId;

    @NotNull(message = "NPI is mandatory")
    @Pattern(regexp = "^\\d{10}$", message = "NPI must be exactly 10 numeric digits")
    private String npi;

    @NotNull(message = "Taxonomy Code is mandatory")
    @Pattern(regexp = "^[0-9A-Z]{10}$", message = "Taxonomy Code must be 10 alphanumeric characters")
    private String taxonomyCode;

    private String licenseNumber;

    private String credentialingStatus;

    private OffsetDateTime createdAt;
}
