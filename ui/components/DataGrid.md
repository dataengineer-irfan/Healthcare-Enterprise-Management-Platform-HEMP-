# UI Component Specification: Enterprise DataGrid

## 1. Component Overview
- **Name**: `EnterpriseDataGrid`
- **File**: `ui/components/DataGrid.tsx`
- **Purpose**: Unified tabular grid component supporting multi-column sorting, filter drawer, column reordering, CSV/Excel export, pagination, and accessibility.

---

## 2. Component Props Interface (TypeScript)
```typescript
export interface ColumnDefinition<T> {
  field: keyof T;
  headerName: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  renderCell?: (row: T) => React.ReactNode;
}

export interface EnterpriseDataGridProps<T> {
  columns: ColumnDefinition<T>[];
  rows: T[];
  totalRecords: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  onSortChange?: (sortField: string, direction: 'asc' | 'desc') => void;
  onExportCsv?: () => void;
  isLoading?: boolean;
}
```

---

## 3. Accessibility & Keyboard Navigation
- WCAG 2.1 AA compliant.
- Navigation via `ArrowKeys` for row selection; `Enter` triggers primary row action.
