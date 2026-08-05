package health.hemp.controller;

import health.hemp.domain.entity.ProviderEntity;
import health.hemp.dto.ProviderDTO;
import health.hemp.mapper.ProviderMapper;
import health.hemp.service.ProviderService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/providers")
public class ProviderController {

    private final ProviderService providerService;

    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> searchProviders(
            @RequestParam(required = false) String npi,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);

        Page<ProviderDTO> providerPage = providerService.searchProviders(npi, pageRequest)
                .map(ProviderMapper::toDTO);

        Map<String, Object> response = Map.of(
            "success", true,
            "data", providerPage.getContent(),
            "currentPage", providerPage.getNumber(),
            "totalItems", providerPage.getTotalElements(),
            "totalPages", providerPage.getTotalPages()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProviderDTO> getProviderById(@PathVariable UUID id) {
        return providerService.findById(id)
                .map(ProviderMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/enroll")
    public ResponseEntity<Map<String, Object>> enrollProvider(@Valid @RequestBody ProviderDTO dto) {
        ProviderEntity entity = ProviderMapper.toEntity(dto);
        ProviderEntity saved = providerService.enrollProvider(entity);
        ProviderDTO responseDto = ProviderMapper.toDTO(saved);

        Map<String, Object> response = Map.of(
            "success", true,
            "data", responseDto,
            "message", "Provider enrollment application submitted successfully"
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
