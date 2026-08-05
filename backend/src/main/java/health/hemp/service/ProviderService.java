package health.hemp.service;

import health.hemp.domain.entity.ProviderEntity;
import health.hemp.repository.ProviderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ProviderService {

    private final ProviderRepository repository;

    public ProviderService(ProviderRepository repository) {
        this.repository = repository;
    }

    public Page<ProviderEntity> searchProviders(String npi, Pageable pageable) {
        if (npi != null && !npi.isBlank()) {
            return repository.findByNpiContaining(npi, pageable);
        }
        return repository.findAll(pageable);
    }

    public Optional<ProviderEntity> findById(UUID id) {
        return repository.findById(id);
    }

    public Optional<ProviderEntity> findByNpi(String npi) {
        return repository.findByNpi(npi);
    }

    public ProviderEntity enrollProvider(ProviderEntity provider) {
        if (provider.getNpi() == null || provider.getNpi().length() != 10) {
            throw new IllegalArgumentException("NPI must be exactly 10 digits.");
        }
        provider.setCredentialingStatus("SUBMITTED");
        return repository.save(provider);
    }
}
