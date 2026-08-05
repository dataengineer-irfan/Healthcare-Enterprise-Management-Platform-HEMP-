import * as fs from 'fs';
import * as path from 'path';

/**
 * HEMP Generator Engine
 * 
 * Pipeline:
 * Metadata JSON ---> HEMP Generator ---> [Spring Boot Service, React UI Component, PostgreSQL Migration DDL]
 */
export class HempGeneratorEngine {
  public static generateModule(metadataPath: string, rootDir: string): void {
    const raw = fs.readFileSync(metadataPath, 'utf-8');
    const metadata = JSON.parse(raw);
    const entityName = metadata.entityName;
    const className = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    const lowerName = entityName.toLowerCase();

    console.log(`[HEMP Generator] Generating end-to-end implementation for: ${className}`);

    // 1. Generate Spring Boot Service
    const serviceCode = `package health.hemp.service;

import health.hemp.domain.entity.${className}Entity;
import health.hemp.repository.${className}Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ${className}Service {

    private final ${className}Repository repository;

    public ${className}Service(${className}Repository repository) {
        this.repository = repository;
    }

    public List<${className}Entity> findAll() {
        return repository.findAll();
    }

    public Optional<${className}Entity> findById(UUID id) {
        return repository.findById(id);
    }

    public ${className}Entity save(${className}Entity entity) {
        return repository.save(entity);
    }
}
`;
    const servicePath = path.join(rootDir, 'backend', 'src', 'main', 'java', 'health', 'hemp', 'service', `${className}Service.java`);
    fs.mkdirSync(path.dirname(servicePath), { recursive: true });
    fs.writeFileSync(servicePath, serviceCode, 'utf-8');

    // 2. Generate Flyway Migration DDL
    const sqlCode = `-- Auto-generated Flyway Migration for ${className}
CREATE TABLE IF NOT EXISTS domain.${lowerName}_profile (
    ${lowerName}_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;
    const sqlPath = path.join(rootDir, 'database', 'migrations', `V1.1__${lowerName}_schema.sql`);
    fs.mkdirSync(path.dirname(sqlPath), { recursive: true });
    fs.writeFileSync(sqlPath, sqlCode, 'utf-8');

    console.log(`[HEMP Generator] Successfully generated ${className} backend service and DB migration!`);
  }
}
