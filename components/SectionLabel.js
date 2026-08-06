export default function SectionLabel({ index, children }) {
  return (
    <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
      {index && <span className="text-lime">{index}</span>}
      <span>{children}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
