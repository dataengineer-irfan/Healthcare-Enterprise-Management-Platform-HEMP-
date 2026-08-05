package health.hemp.demo.controller;

import health.hemp.demo.entity.ClaimEntity;
import health.hemp.demo.entity.MemberEntity;
import health.hemp.demo.entity.ProviderEntity;
import health.hemp.demo.repository.ClaimRepository;
import health.hemp.demo.repository.MemberRepository;
import health.hemp.demo.repository.ProviderRepository;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/claims")
public class ClaimController {

    private final ClaimRepository claimRepository;
    private final ProviderRepository providerRepository;
    private final MemberRepository memberRepository;

    public ClaimController(ClaimRepository claimRepository, ProviderRepository providerRepository, MemberRepository memberRepository) {
        this.claimRepository = claimRepository;
        this.providerRepository = providerRepository;
        this.memberRepository = memberRepository;
    }

    @GetMapping
    public ResponseEntity<?> searchClaims(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);

        Page<ClaimEntity> pageResult;
        if (search != null && !search.isBlank()) {
            pageResult = claimRepository.findByClaimNumberContainingIgnoreCaseOrStatusContainingIgnoreCaseOrDiagnosisCodeContainingIgnoreCase(
                    search, search, search, pageRequest);
        } else {
            pageResult = claimRepository.findAll(pageRequest);
        }

        return ResponseEntity.ok(Map.of(
                "content", pageResult.getContent(),
                "page", pageResult.getNumber(),
                "size", pageResult.getSize(),
                "totalElements", pageResult.getTotalElements(),
                "totalPages", pageResult.getTotalPages()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClaimById(@PathVariable String id) {
        return claimRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> submitClaim(@RequestBody Map<String, Object> payload) {
        String providerId = (String) payload.get("providerId");
        String memberId = (String) payload.get("memberId");
        String claimNumber = (String) payload.get("claimNumber");
        String diagnosisCode = (String) payload.get("diagnosisCode");
        String procedureCode = (String) payload.get("procedureCode");
        BigDecimal billedAmount = new BigDecimal(payload.get("billedAmount").toString());

        ProviderEntity provider = providerRepository.findById(providerId).orElse(null);
        if (provider == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Provider ID " + providerId + " not found"));
        }

        MemberEntity member = memberRepository.findById(memberId).orElse(null);
        if (member == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Member ID " + memberId + " not found"));
        }

        if (claimNumber == null || claimNumber.isBlank()) {
            claimNumber = "CLM-" + (882000 + (int)(Math.random() * 9000));
        }

        if (claimRepository.findByClaimNumber(claimNumber).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Claim Number " + claimNumber + " already exists"));
        }

        ClaimEntity claim = ClaimEntity.builder()
                .claimId("clm-" + UUID.randomUUID().toString().substring(0, 8))
                .claimNumber(claimNumber)
                .provider(provider)
                .member(member)
                .claimDate(LocalDate.now())
                .serviceDate(LocalDate.now().minusDays(3))
                .billedAmount(billedAmount)
                .approvedAmount(BigDecimal.ZERO)
                .status("SUBMITTED")
                .diagnosisCode(diagnosisCode != null ? diagnosisCode : "I10")
                .procedureCode(procedureCode != null ? procedureCode : "99214")
                .createdDate(OffsetDateTime.now())
                .build();

        ClaimEntity saved = claimRepository.save(claim);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveClaim(@PathVariable String id) {
        ClaimEntity claim = claimRepository.findById(id).orElse(null);
        if (claim == null) return ResponseEntity.notFound().build();

        claim.setStatus("APPROVED");
        claim.setApprovedAmount(claim.getBilledAmount().multiply(new BigDecimal("0.85")).setScale(2, RoundingMode.HALF_UP));

        ClaimEntity updated = claimRepository.save(claim);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectClaim(@PathVariable String id) {
        ClaimEntity claim = claimRepository.findById(id).orElse(null);
        if (claim == null) return ResponseEntity.notFound().build();

        claim.setStatus("REJECTED");
        claim.setApprovedAmount(BigDecimal.ZERO);

        ClaimEntity updated = claimRepository.save(claim);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClaim(@PathVariable String id) {
        if (!claimRepository.existsById(id)) return ResponseEntity.notFound().build();
        claimRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Claim deleted successfully"));
    }
}
