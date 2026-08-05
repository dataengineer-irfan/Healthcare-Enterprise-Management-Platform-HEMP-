# AI Governance & Security Specification

## 1. Principles of AI Operation
All AI interactions within HEMP/EAP v3.0 operate under strict governance protocols to ensure security, privacy compliance (HIPAA), and auditability.

```
User Query ──► Auth & RBAC Check ──► Knowledge Brain (Semantic Catalog) ──► Governed Executor ──► Audit Logged Response
```

## 2. Security Requirements
1. **Zero Unsandboxed Execution**: The AI Brain is forbidden from invoking direct system commands, un-sandboxed shell scripts, or arbitrary DB modifications outside governed store procedure / API endpoints.
2. **Role-Based Context Filtering**: Context injected into RAG or Text-to-SQL prompts is filtered dynamically based on the requesting user's security permissions (e.g. PHI/PII redaction rules).
3. **Immutable Audit Trail**: Every AI invocation logs prompt tokens, target model, generated query, execution status, and response summary into `audit.audit_log`.

## 3. Specialized AI Assistants
- **Business Assistant**: Answers natural language domain questions using the Knowledge Brain glossary and semantic catalog.
- **Workflow Assistant**: Recommends next state transitions, task assignments, and escalation actions based on workflow metadata.
- **Text-to-SQL Assistant**: Translates authorized natural language analytics queries into parameterised SQL targeting the Analytics Brain.
- **Developer Assistant**: Generates metadata definitions (JSON schemas) and DDL extensions adhering to EHP-OS engineering standards.
