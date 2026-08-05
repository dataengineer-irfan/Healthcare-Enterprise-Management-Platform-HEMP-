package health.hemp.demo.controller;

import health.hemp.demo.repository.MemberRepository;
import health.hemp.demo.repository.ProviderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final ProviderRepository providerRepository;
    private final MemberRepository memberRepository;

    public DashboardController(ProviderRepository providerRepository, MemberRepository memberRepository) {
        this.providerRepository = providerRepository;
        this.memberRepository = memberRepository;
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getDashboardSummary() {
        long totalProviders = providerRepository.count();
        long totalMembers = memberRepository.count();

        Map<String, Object> claimsSummary = Map.of(
                "totalClaims", 1420,
                "approvedClaims", 1150,
                "pendingClaims", 185,
                "deniedClaims", 85,
                "totalBilledAmount", 4850000.00,
                "totalPaidAmount", 3920000.00
        );

        return ResponseEntity.ok(Map.of(
                "totalProviders", totalProviders,
                "totalMembers", totalMembers,
                "claims", claimsSummary
        ));
    }
}
