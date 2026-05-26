type SpinnerSize = "sm" | "md" | "lg";

const sizes: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]"
};

export function Spinner({ size = "md", className = "" }: { size?: SpinnerSize; className?: string }) {
  return (
    <span
      role="status"
      aria-label="Yukleniyor"
      className={`inline-block animate-spin rounded-full border-brand-200 border-t-brand-700 ${sizes[size]} ${className}`}
    />
  );
}
