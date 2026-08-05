package health.hemp.service;

import health.hemp.domain.entity.ProviderEntity;
import health.hemp.repository.ProviderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class ProviderServiceTest {

    @Mock
    private ProviderRepository repository;

    @InjectMocks
    private ProviderService providerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testEnrollProvider_Success() {
        ProviderEntity provider = ProviderEntity.builder()
                .npi("1234567890")
                .taxonomyCode("207Q00000X")
                .build();

        when(repository.save(any(ProviderEntity.class))).thenAnswer(i -> i.getArguments()[0]);

        ProviderEntity saved = providerService.enrollProvider(provider);
        assertNotNull(saved);
        assertEquals("1234567890", saved.getNpi());
        assertEquals("SUBMITTED", saved.getCredentialingStatus());
    }

    @Test
    void testEnrollProvider_InvalidNpi_ThrowsException() {
        ProviderEntity provider = ProviderEntity.builder()
                .npi("123")
                .taxonomyCode("207Q00000X")
                .build();

        assertThrows(IllegalArgumentException.class, () -> providerService.enrollProvider(provider));
    }
}
