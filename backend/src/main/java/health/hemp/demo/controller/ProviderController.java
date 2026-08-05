package health.hemp.demo.controller;

import health.hemp.demo.entity.ProviderEntity;
import health.hemp.demo.repository.ProviderRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/providers")
public class ProviderController {

    private final ProviderRepository providerRepository;

    public ProviderController(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    @GetMapping
    public ResponseEntity<?> searchProviders(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);

        Page<ProviderEntity> pageResult;
        if (search != null && !search.isBlank()) {
            pageResult = providerRepository.findByProviderNameContainingIgnoreCaseOrNpiContaining(search, search, pageRequest);
        } else {
            pageResult = providerRepository.findAll(pageRequest);
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
    public ResponseEntity<?> getProviderById(@PathVariable String id) {
        return providerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createProvider(@Valid @RequestBody ProviderEntity provider) {
        if (providerRepository.findByNpi(provider.getNpi()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Provider NPI " + provider.getNpi() + " already exists"));
        }

        if (provider.getProviderId() == null || provider.getProviderId().isBlank()) {
            provider.setProviderId("prv-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (provider.getCreatedDate() == null) {
            provider.setCreatedDate(OffsetDateTime.now());
        }

        ProviderEntity saved = providerRepository.save(provider);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProvider(@PathVariable String id, @Valid @RequestBody ProviderEntity provider) {
        ProviderEntity existing = providerRepository.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setProviderName(provider.getProviderName());
        existing.setTaxonomyCode(provider.getTaxonomyCode());
        existing.setStatus(provider.getStatus());
        existing.setPhone(provider.getPhone());
        existing.setEmail(provider.getEmail());

        ProviderEntity updated = providerRepository.save(existing);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProvider(@PathVariable String id) {
        if (!providerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        providerRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Provider deleted successfully"));
    }
}
