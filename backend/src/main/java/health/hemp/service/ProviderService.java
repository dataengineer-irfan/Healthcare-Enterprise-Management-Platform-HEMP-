package health.hemp.service;

import health.hemp.domain.entity.ProviderEntity;
import health.hemp.repository.ProviderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ProviderService {

    private final ProviderRepository repository;

    public ProviderService(ProviderRepository repository) {
        this.repository = repository;
    }

    public List<ProviderEntity> findAll() {
        return repository.findAll();
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
