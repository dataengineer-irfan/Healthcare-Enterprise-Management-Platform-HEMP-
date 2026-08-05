package health.hemp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/providers")
public class ProviderController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> searchProviders(
            @RequestParam(required = false) String npi,
            @RequestParam(required = false) String state) {
        
        Map<String, Object> response = Map.of(
            "success", true,
            "data", List.of(
                Map.of(
                    "providerId", "123e4567-e89b-12d3-a456-426614174000",
                    "npi", "1234567890",
                    "taxonomyCode", "207Q00000X",
                    "credentialingStatus", "APPROVED"
                )
            ),
            "total", 1
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/enroll")
    public ResponseEntity<Map<String, Object>> enrollProvider(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = Map.of(
            "success", true,
            "claimId", "123e4567-e89b-12d3-a456-426614174001",
            "message", "Provider enrollment application submitted successfully"
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
