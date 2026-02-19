interface ComplianceNoteProps {
  compact?: boolean;
}

export default function ComplianceNote({ compact = false }: ComplianceNoteProps) {
  return (
    <p
      className={`rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/10 text-[var(--text-1)] ${
        compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'
      }`}
    >
      Research use only. Not approved for human consumption or therapeutic use. Placeholder pricing and protocol
      guidance are provided for demonstration only.
    </p>
  );
}
