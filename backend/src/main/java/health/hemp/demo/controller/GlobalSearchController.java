package health.hemp.demo.controller;

import health.hemp.demo.repository.ClaimRepository;
import health.hemp.demo.repository.MemberRepository;
import health.hemp.demo.repository.ProviderRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/search")
public class GlobalSearchController {

    private final ProviderRepository providerRepository;
    private final MemberRepository memberRepository;
    private final ClaimRepository claimRepository;

    public GlobalSearchController(ProviderRepository providerRepository, MemberRepository memberRepository, ClaimRepository claimRepository) {
        this.providerRepository = providerRepository;
        this.memberRepository = memberRepository;
        this.claimRepository = claimRepository;
    }

    @GetMapping
    public ResponseEntity<?> globalSearch(@RequestParam String q) {
        PageRequest limit = PageRequest.of(0, 5);
        var providers = providerRepository.findByProviderNameContainingIgnoreCaseOrNpiContaining(q, q, limit).getContent();
        var members = memberRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrMemberNumberContaining(q, q, q, limit).getContent();
        var claims = claimRepository.findByClaimNumberContainingIgnoreCaseOrStatusContainingIgnoreCaseOrDiagnosisCodeContainingIgnoreCase(q, q, q, limit).getContent();

        return ResponseEntity.ok(Map.of(
                "query", q,
                "providers", providers,
                "members", members,
                "claims", claims
        ));
    }
}
