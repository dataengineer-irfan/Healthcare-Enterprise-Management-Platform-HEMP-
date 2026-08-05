export interface FormFieldMetadata {
  fieldName: string;
  displayLabel: string;
  dataType: string;
  isRequired: boolean;
  validationRegex?: string;
  uiComponent: string;
}

export interface FormSchemaMetadata {
  formId: string;
  entityId: string;
  title: string;
  fields: FormFieldMetadata[];
}

export class FormEngineRuntime {
  public static validateField(field: FormFieldMetadata, value: any): { valid: boolean; error?: string } {
    if (field.isRequired && (value === undefined || value === null || value === '')) {
      return { valid: false, error: `${field.displayLabel} is required.` };
    }
    if (value && field.validationRegex) {
      const regex = new RegExp(field.validationRegex);
      if (!regex.test(String(value))) {
        return { valid: false, error: `${field.displayLabel} format is invalid.` };
      }
    }
    return { valid: true };
  }
}
