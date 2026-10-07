interface BadgeProps {
  label: string;
  className?: string;
}

export default function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block max-w-full rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs wrap-break-word text-primary ${className}`}
    >
      {label}
    </span>
  );
}
