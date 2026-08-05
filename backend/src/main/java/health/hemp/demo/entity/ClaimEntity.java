package health.hemp.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "claim")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClaimEntity {

    @Id
    @Column(name = "claim_id", nullable = false)
    private String claimId;

    @Column(name = "claim_number", nullable = false, unique = true)
    private String claimNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "provider_id", nullable = false)
    private ProviderEntity provider;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id", nullable = false)
    private MemberEntity member;

    @Column(name = "claim_date", nullable = false)
    private LocalDate claimDate;

    @Column(name = "service_date", nullable = false)
    private LocalDate serviceDate;

    @Column(name = "billed_amount", nullable = false)
    private BigDecimal billedAmount;

    @Column(name = "approved_amount")
    private BigDecimal approvedAmount;

    @Column(name = "status", nullable = false)
    private String status; // SUBMITTED, APPROVED, REJECTED, PENDING

    @Column(name = "diagnosis_code", nullable = false)
    private String diagnosisCode;

    @Column(name = "procedure_code", nullable = false)
    private String procedureCode;

    @Column(name = "created_date")
    private OffsetDateTime createdDate;
}
