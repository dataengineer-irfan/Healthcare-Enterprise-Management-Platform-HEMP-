# Multi-Agent Framework Architecture

## 1. Overview
The platform deploys 4 specialized AI Agents operating over the Knowledge Brain and Platform Kernel APIs.

## 2. Specialized Agents
1. **Business Assistant**: Resolves business terms, policy questions, and eligibility rules via RAG.
2. **Text-to-SQL Assistant**: Generates parameterized PostgreSQL queries against `reporting` schema read views.
3. **Workflow Assistant**: Recommends next state transitions and flags SLA breach risks.
4. **Developer Assistant**: Generates metadata definitions (`JSON Schema`) and DDL scripts matching engineering standards.
