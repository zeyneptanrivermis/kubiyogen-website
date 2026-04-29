import { InputHTMLAttributes } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
};

export function Checkbox({ label, description, className = "", ...props }: CheckboxProps) {
  return (
    <label className={`flex items-start gap-3 rounded-lg border border-line bg-white p-3 ${className}`}>
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-line text-brand-700 focus:ring-brand-500"
        {...props}
      />
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {description ? <span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span> : null}
      </span>
    </label>
  );
}
