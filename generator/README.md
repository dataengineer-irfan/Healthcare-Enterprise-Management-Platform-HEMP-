# Code Generation Framework

## 1. Overview
The Code Generation Framework parses canonical metadata schemas (`/metadata/entities/`, `/registry/entities/`) and outputs working Java Spring Boot entities, OpenAPI 3.0 contracts, React TypeScript components, PostgreSQL DDL migrations, and unit test suites.

## 2. Generators Index
- `entity-generator/`: Generates Spring Boot JPA Entities & Repositories from JSON schemas.
- `api-generator/`: Generates OpenAPI 3.0 YAML specifications.
- `ui-generator/`: Generates React TypeScript `MetadataForm` and `EnterpriseGrid` components.
- `migration-generator/`: Generates Liquibase / Flyway PostgreSQL DDL scripts.
- `ai-generator/`: Generates `ai.semantic_catalog` rows and Text-to-SQL prompt templates.
