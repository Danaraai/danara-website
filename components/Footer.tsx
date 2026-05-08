export default function Footer() {
  return (
    <footer className="border-t border-hairline border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-7 text-[12px] text-ink-muted md:px-10">
        <p>
          <span className="text-ink">danara</span>
          <span className="mx-2 text-ink-faint">·</span>
          <span>2025</span>
        </p>

        <ul className="flex flex-wrap items-center gap-x-5">
          <li>
            <a
              className="transition hover:text-ink"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              linkedin
            </a>
          </li>
          <li>
            <a
              className="transition hover:text-ink"
              href="https://github.com/Danaraai"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>
          </li>
          <li>
            <a
              className="transition hover:text-ink"
              href="mailto:danarabuvaeva@gmail.com"
            >
              email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
