# Text-to-SQL Engine Specification

## 1. Context Resolution
The Text-to-SQL engine consults `ai.semantic_catalog` to resolve entity tables, synonyms, and join relationships before generating SQL.

## 2. Guardrails
- Only `SELECT` statements permitted.
- Maximum execution timeout enforced (5 seconds).
- Query target restricted to `reporting` schema views.
