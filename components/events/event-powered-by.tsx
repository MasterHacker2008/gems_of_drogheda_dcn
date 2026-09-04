type EventPoweredByProps = {
  label?: string;
  partners?: string[];
};

export function EventPoweredBy({ label, partners }: EventPoweredByProps) {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 bg-foreground px-5 py-5 md:px-10">
      {label ? (
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">{label}</span>
      ) : null}
      {partners.map((partner) => (
        <span key={partner} className="font-heading text-[15px] font-semibold text-background/82">
          {partner}
        </span>
      ))}
    </div>
  );
}
