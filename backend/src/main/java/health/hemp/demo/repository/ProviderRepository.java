package health.hemp.demo.repository;

import health.hemp.demo.entity.ProviderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<ProviderEntity, String> {
    Optional<ProviderEntity> findByNpi(String npi);
    Page<ProviderEntity> findByProviderNameContainingIgnoreCaseOrNpiContaining(String name, String npi, Pageable pageable);
}
