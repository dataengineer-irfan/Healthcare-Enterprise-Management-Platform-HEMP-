# 04_AI_Architecture.md — Enterprise AI Architecture Specification

## 1. Purpose
This document defines AI as a first-class platform capability within HEMP, detailing the AI runtime, AI gateway, multi-agent framework, RAG architecture, Text-to-SQL engine, semantic catalog, prompt management, model registry, tool execution, and AI governance.

---

## 2. Scope
Applies to all AI assistants (Chat, Developer, Analytics, Text-to-SQL), vector search indexes, LLM gateways, agent frameworks, and AI governance layers across HEMP.

---

## 3. Objectives
- Establish a metadata-driven, secure AI platform embedded into the EHP-OS kernel.
- Power 4 specialized AI Assistants:
  1. **Business Chat Assistant**: Answers domain questions using business glossaries & documentation RAG.
  2. **Developer Assistant**: Generates metadata definitions, DDL scripts, and API specs adhering to engineering standards.
  3. **Analytics & Text-to-SQL Assistant**: Translates natural language into governed PostgreSQL SQL queries.
  4. **Workflow Assistant**: Recommends state machine transitions, task routing, and SLA escalation paths.
- Enforce strict AI governance, zero un-sandboxed execution, and complete prompt/tool auditability.

---

## 4. Design Principles
1. **AI as a Governed Citizen**: AI operations MUST authenticate, check RBAC permissions, and invoke approved platform APIs or database read views.
2. **Metadata Context Injection**: RAG and Text-to-SQL rely on explicit metadata from `ai.semantic_catalog` rather than guessing schema relationships.
3. **Multi-Agent Orchestration**: Specialized agents handle targeted tasks via well-defined tool sets.
4. **Explainable AI (XAI)**: All AI responses return step-by-step reasoning traces and source references.

---

## 5. AI Platform Architecture

```
┌───────────────────────────────────────────────────────────────────────────┐
│ User UI / Chat Interface                                                  │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │ Natural Language Prompt
┌─────────────────────────────────────▼─────────────────────────────────────┐
│ AI Gateway (Auth Check, Rate Limiting, Input Sanitization Guardrail)      │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
┌─────────────────────────────────────▼─────────────────────────────────────┐
│ Agent Orchestration Hub                                                   │
│ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────────────┐ │
│ │ Business Assistant│ │ Text-to-SQL Agent │ │ Developer Assistant       │ │
│ └─────────┬─────────┘ └─────────┬─────────┘ └─────────────┬─────────────┘ │
└───────────┼─────────────────────┼─────────────────────────┼───────────────┘
            │                     │                         │
┌───────────▼─────────────────────▼─────────────────────────▼───────────────┐
│ Knowledge Brain (Semantic Catalog, Vector Index, Business Glossary)       │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │ Governed Tool / API Execution
┌─────────────────────────────────────▼─────────────────────────────────────┐
│ Platform Kernel Execution Runtime & Audit Logger                          │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Detailed Components & Subsystems

### 6.1 Semantic Catalog (`ai.semantic_catalog`)
Every business entity is declared in the Knowledge Brain:
```sql
CREATE TABLE ai.semantic_catalog (
    catalog_id VARCHAR(64) PRIMARY KEY,
    entity_id VARCHAR(64) NOT NULL REFERENCES metadata.entity_definition(entity_id),
    business_definition TEXT NOT NULL,
    synonyms TEXT[],
    search_keywords TEXT[],
    example_nl_queries TEXT[],
    allowed_operations TEXT[] DEFAULT ARRAY['SELECT']
);
```

### 6.2 Text-to-SQL Architecture
1. **Prompt Sanitization**: Strips malicious SQL injection patterns.
2. **Context Enrichment**: Injects relevant schema comments and `semantic_catalog` hints.
3. **Parameterization**: Forces parameterized SQL generation.
4. **Read-Only Execution**: Executes against read-replica views with query execution timeouts (e.g., 5 seconds).

### 6.3 Tool Execution Framework
Agents execute operations exclusively through defined tools:
```typescript
interface ToolDefinition {
  name: string;
  description: string;
  parameters: JSONSchema;
  execute(params: any, securityContext: SecurityContext): Promise<any>;
}
```

---

## 7. Dependencies
- **LLM Gateway**: Provider-agnostic proxy (supports OpenAI, Anthropic, Ollama, vLLM).
- **Vector Search Engine**: `pgvector` extension for PostgreSQL or Qdrant/Milvus.
- **Agent Framework**: LangChain / LlamaIndex / Custom Agent Loop.

---

## 8. Security Considerations
- Prompt injection protection via guardrail pre-processors.
- PII/PHI redaction filter applied to all prompts before transmission to external LLM endpoints.
- User identity & RBAC context propagated to all tool execution tools.

---

## 9. AI Evaluation & Quality Assurance
- Automated evaluation suite testing Text-to-SQL accuracy against benchmark query sets.
- RAG faithfulness & hallucination scoring using automated grading agents.

---

## 10. Future Enhancements
- Fine-tuned domain-specific local open-weights model deployment (e.g. Llama-3-70B fine-tuned on healthcare FHIR/X12 standards).
- Real-time voice interface support for provider & claims customer support agents.

---

## 11. Cross References
- [00_Project_Context.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/00_Project_Context.md)
- [01_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/01_Architecture.md)
- [02_Database_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/02_Database_Architecture.md)
- [03_Security_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/03_Security_Architecture.md)

---

## 12. Version History
- **v1.0.0** (2026-08-05): Initial release of Enterprise AI Architecture Specification.
