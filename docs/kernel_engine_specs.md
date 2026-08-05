# Kernel Engine Service Interfaces Specification

## Overview
This specification details the interfaces and runtime responsibilities for the **5 Core Kernel Engines** powering EHP-OS v3.0.

---

## 1. Entity Engine
Interface contract for registering entity metadata and executing metadata-driven CRUD operations.

```typescript
interface EntityEngine {
  registerEntity(metadata: EntityDefinition): Promise<void>;
  createRecord<T>(entityId: string, payload: Partial<T>, context: SecurityContext): Promise<T>;
  getRecordById<T>(entityId: string, id: string, context: SecurityContext): Promise<T>;
  updateRecord<T>(entityId: string, id: string, patchPayload: Partial<T>, context: SecurityContext): Promise<T>;
  deleteRecord(entityId: string, id: string, context: SecurityContext): Promise<boolean>;
}
```

## 2. Form Engine
Interface contract for generating UI form models from entity metadata and field validation rules.

```typescript
interface FormEngine {
  generateFormSchema(entityId: string, formLayoutId?: string): Promise<FormSchema>;
  validateFormData(entityId: string, formData: Record<string, any>): Promise<ValidationResult>;
}
```

## 3. Grid Engine
Interface contract for dynamic tabular grid configuration and querying.

```typescript
interface GridEngine {
  fetchGridData(entityId: string, queryParams: GridQueryParams): Promise<PaginatedResult<any>>;
  saveGridView(userId: string, entityId: string, config: GridViewConfig): Promise<void>;
}
```

## 4. Workflow Engine
Interface contract for executing entity state machine transitions.

```typescript
interface WorkflowEngine {
  startWorkflow(workflowId: string, entityId: string, recordId: string, initiatorId: string): Promise<WorkflowInstance>;
  transitionState(instanceId: string, action: string, actorId: string, comments?: string): Promise<WorkflowInstance>;
  getPendingTasksForUser(userId: string): Promise<TaskItem[]>;
}
```

## 5. Rules Engine
Interface contract for evaluating metadata rules (validations, calculations, routing).

```typescript
interface RulesEngine {
  evaluateRules(entityId: string, contextData: Record<string, any>): Promise<RuleEvaluationResult>;
}
```
