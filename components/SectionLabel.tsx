export default function SectionLabel({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <p className="mb-10 text-[11px] uppercase tracking-label text-violet-soft">
      {number} &mdash; {title}
    </p>
  );
}
