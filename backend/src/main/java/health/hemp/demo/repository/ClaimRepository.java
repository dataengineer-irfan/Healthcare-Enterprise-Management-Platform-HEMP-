package health.hemp.demo.repository;

import health.hemp.demo.entity.ClaimEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClaimRepository extends JpaRepository<ClaimEntity, String> {
    Optional<ClaimEntity> findByClaimNumber(String claimNumber);
    Page<ClaimEntity> findByClaimNumberContainingIgnoreCaseOrStatusContainingIgnoreCaseOrDiagnosisCodeContainingIgnoreCase(
            String claimNumber, String status, String diagnosisCode, Pageable pageable);
}
