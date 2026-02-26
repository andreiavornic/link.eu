import { AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.trim();
  if (!value) return null;

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    if (!url.hostname.includes('.')) {
      return { invalidUrl: true };
    }
    return null;
  } catch {
    return { invalidUrl: true };
  }
}

export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}
