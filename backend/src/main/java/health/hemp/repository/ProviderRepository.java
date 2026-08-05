package health.hemp.repository;

import health.hemp.domain.entity.ProviderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProviderRepository extends JpaRepository<ProviderEntity, UUID> {
    Optional<ProviderEntity> findByNpi(String npi);
    Page<ProviderEntity> findByNpiContaining(String npi, Pageable pageable);
}
