# AI Gateway Architecture Specification

## 1. Overview
The AI Gateway acts as the single security enforcement point for all natural language prompts, Text-to-SQL translations, and agent tool executions in HEMP.

```
User Prompt ──► AI Gateway (Auth & Input Sanitization) ──► LLM Provider (Anthropic / OpenAI / Local)
```

## 2. Key Responsibilities
- **Authentication Propagation**: Extracts `jwt_token` and attaches authenticated user context to all LLM requests.
- **Prompt Injection Defense**: Sanitizes input strings against jailbreak patterns.
- **PII/PHI Anonymization**: Masks member SSNs and DOBs prior to external API dispatch.
