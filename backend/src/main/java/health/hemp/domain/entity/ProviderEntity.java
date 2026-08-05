package health.hemp.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "provider_profile", schema = "domain")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "provider_id", nullable = false, updatable = false)
    private UUID providerId;

    @Column(name = "npi", nullable = false, unique = true, length = 10)
    private String npi;

    @Column(name = "taxonomy_code", nullable = false, length = 32)
    private String taxonomyCode;

    @Column(name = "license_number", length = 64)
    private String licenseNumber;

    @Column(name = "credentialing_status", nullable = false, length = 32)
    private String credentialingStatus;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = OffsetDateTime.now();
        if (this.credentialingStatus == null) {
            this.credentialingStatus = "PENDING";
        }
    }
}
