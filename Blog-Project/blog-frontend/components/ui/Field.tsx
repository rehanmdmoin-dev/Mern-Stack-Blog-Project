"use client";

import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

function FieldWrapper({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-medium text-danger">{error}</span>}
    </label>
  );
}

const base =
  "w-full rounded-control border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string };
export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, hint, className = "", ...props }, ref) => (
  <FieldWrapper label={label} error={error} hint={hint}>
    <input ref={ref} className={`${base} ${error ? "border-danger" : ""} ${className}`} {...props} />
  </FieldWrapper>
));
Input.displayName = "Input";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; hint?: string };
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, hint, className = "", ...props }, ref) => (
  <FieldWrapper label={label} error={error} hint={hint}>
    <textarea ref={ref} className={`${base} min-h-[110px] resize-y ${error ? "border-danger" : ""} ${className}`} {...props} />
  </FieldWrapper>
));
Textarea.displayName = "Textarea";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; hint?: string };
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, error, hint, className = "", children, ...props }, ref) => (
  <FieldWrapper label={label} error={error} hint={hint}>
    <select ref={ref} className={`${base} ${error ? "border-danger" : ""} ${className}`} {...props}>
      {children}
    </select>
  </FieldWrapper>
));
Select.displayName = "Select";
