package health.hemp.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "provider")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderEntity {

    @Id
    @Column(name = "provider_id", nullable = false)
    private String providerId;

    @Column(name = "npi", nullable = false, unique = true)
    private String npi;

    @Column(name = "provider_name", nullable = false)
    private String providerName;

    @Column(name = "taxonomy_code", nullable = false)
    private String taxonomyCode;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "created_date")
    private OffsetDateTime createdDate;
}
