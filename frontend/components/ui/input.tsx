import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  error?: string;
};

type InputProps = FieldProps & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        className={`mt-2 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}

type TextareaProps = FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <textarea
        className={`mt-2 min-h-28 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}
