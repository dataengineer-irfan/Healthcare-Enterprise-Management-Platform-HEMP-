# Provider Module — Workflow State Machine

```
[DRAFT] --> (SUBMIT) --> [SUBMITTED] --> (START_CREDENTIALING) --> [IN_CREDENTIALING]
                                                                        │
                                             ┌──────────────────────────┴──────────────────────────┐
                                             ▼                                                     ▼
                                       (APPROVE)                                               (REJECT)
                                             │                                                     │
                                             ▼                                                     ▼
                                        [APPROVED]                                             [REJECTED]
```
